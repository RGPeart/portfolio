// Usage: node scripts/screenshot.mjs <url> <outDir> [label]
// Captures full-page screenshots at small phone/mobile/tablet/desktop widths and reports
// console errors, failed requests, HTTP 4xx/5xx responses and horizontal
// overflow per viewport.
// The site is built with base '/portfolio' and trailing slashes, so preview
// URLs look like http://localhost:4399/portfolio/ or .../portfolio/projects/.
import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';

const [url, outDir = 'screenshots', label = 'page'] = process.argv.slice(2);
if (!url) {
  console.error('Usage: node scripts/screenshot.mjs <url> <outDir> [label]');
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'small', width: 360, height: 780 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 900 },
];

// Playwright's bundled Chromium lacks system libs on this host; use the system
// snap Chromium instead (override with PW_CHROMIUM=/path/to/chrome).
const executablePath = process.env.PW_CHROMIUM || (existsSync('/snap/bin/chromium') ? '/snap/bin/chromium' : undefined);
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
let problems = 0;
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => {
    // Chromium's built-in PDF viewer (resume iframe) loads from chrome-extension://
    // and aborts in headless mode; it is not a site resource.
    if (r.url().startsWith('chrome-extension://')) return;
    errors.push(`request failed: ${r.url()}`);
  });
  // Console "Failed to load resource" messages omit the URL; log it here.
  page.on('response', (r) => r.status() >= 400 && errors.push(`HTTP ${r.status()}: ${r.url()}`));
  const res = await page.goto(url, { waitUntil: 'networkidle' });
  if (res && !res.ok()) errors.push(`page itself returned HTTP ${res.status()}; check the URL includes the base path (/portfolio/) and trailing slash`);
  // Sections fade in as they scroll into view, and a full-page capture doesn't scroll,
  // so walk down the page first, then return to the top and let the animations finish.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += Math.round(vp.height / 2)) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(50);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  const file = `${outDir}/${label}-${vp.name}-${vp.width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(`${vp.name} ${vp.width}px -> ${file}${overflow > 0 ? `  OVERFLOW ${overflow}px` : ''}`);
  errors.forEach((e) => console.log(`  error: ${e}`));
  problems += errors.length + (overflow > 0 ? 1 : 0);
  await page.close();
}
await browser.close();
console.log(problems ? `${problems} problem(s) found` : 'no console errors or horizontal overflow');
