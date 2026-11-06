// Writes src/data/contributions.json from GitHub's GraphQL API.
// CI passes GITHUB_TOKEN; locally it falls back to the `gh` CLI.
// On any failure it keeps the existing snapshot and exits 0, so a GitHub hiccup never blocks a deploy.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const login = 'RGPeart';
const out = new URL('../src/data/contributions.json', import.meta.url);
const query = `query($u:String!){user(login:$u){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;

async function fetchCalendar() {
  const token = process.env.GITHUB_TOKEN;
  let body;
  if (token) {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'portfolio-build' },
      body: JSON.stringify({ query, variables: { u: login } }),
    });
    if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
    body = await res.json();
  } else {
    body = JSON.parse(execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`, '-f', `u=${login}`], { encoding: 'utf8' }));
  }
  const cal = body?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error(`Unexpected response: ${JSON.stringify(body?.errors ?? body).slice(0, 200)}`);
  return cal;
}

const levels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

try {
  const cal = await fetchCalendar();
  const data = {
    login,
    updated: new Date().toISOString().slice(0, 10),
    total: cal.totalContributions,
    weeks: cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: levels[d.contributionLevel] ?? 0 })),
    ),
  };
  writeFileSync(out, JSON.stringify(data));
  console.log(`contributions: ${data.total} in ${data.weeks.length} weeks`);
} catch (err) {
  console.warn(`contributions: fetch failed, keeping existing snapshot (${err.message})`);
}
