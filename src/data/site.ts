// All page content lives here so copy edits don't touch markup.
// Experience, skills and certifications mirror the Canva resume v3 (exported 2026-11-05).

export const person = {
  name: 'Ryan Peart',
  title: 'Data Engineer',
  location: 'New York, NY',
  summary:
    'Data engineer with 7 years of experience building ETL/ELT pipelines and cloud data platforms with SQL, Python, Databricks, Azure and Snowflake. I have delivered solutions for 9 Accenture clients across insurance, healthcare, retail and banking, leading offshore teams along the way.',
  github: 'https://github.com/RGPeart',
  linkedin: 'https://www.linkedin.com/in/ryan-peart/',
  // File under public/. The PDF contains a phone number and email address.
  resume: 'Ryan_Peart_Resume.pdf' as string | null,
  // File under public/ (e.g. 'headshot.jpg'). While null, the home page shows an initials avatar.
  photo: 'headshot.jpg' as string | null,
  photoAlt: 'Headshot of Ryan Peart',
  initials: 'RP',
};

// Home-page greeting. Draft copy; every claim comes from the resume or the project list.
export const intro = {
  greeting: 'Hi, I’m Ryan 👋',
  paragraphs: [
    'I’m a data engineer based in New York. I like turning messy data from lots of different systems into something a team can actually trust and use.',
    'By day I build cloud data pipelines at Accenture, and I’ve delivered work for nine clients across insurance, healthcare, retail and banking. Outside of work I build side projects, like a data pipeline and recommender for my own Spotify listening history and a stock screener.',
    'Have a look around, and feel free to say hello on LinkedIn.',
  ],
};

export const description =
  'Ryan Peart is a data engineer in New York with 7 years of experience in SQL, Python, Azure, Databricks, Snowflake and BigQuery. Projects, experience and certifications.';

// Headline numbers for the home page; each comes from the resume.
export const highlights = [
  { value: '7', label: 'years in data engineering' },
  { value: '9', label: 'Accenture clients delivered' },
  { value: '1,000+', label: 'member Data & AI 101 community, directed' },
  { value: '4', label: 'cloud and data certifications' },
];

export const experience = [
  {
    role: 'Data Engineer Consultant',
    earlierRole: 'Data Engineer Senior Analyst, 03/2022 – 11/2024',
    org: 'Accenture, New York, NY',
    dates: '11/2024 – present',
    points: [
      'Led end-to-end data engineering delivery for 9 clients across insurance, healthcare, retail and banking, mostly on Azure.',
      'Built pipelines with Databricks and Azure Data Factory that deliver analytics-ready datasets in Snowflake and Google BigQuery.',
      'Built and optimized ETL/ELT pipelines and ingestion frameworks, orchestrating hundreds of concurrent pipelines and hundreds of thousands of daily record changes across multiple sources.',
      'Strengthened governance, lineage and data quality through pipeline observability, source-to-target mappings and automated validation checks.',
      'Led offshore teams of 3 to 5 engineers and served as primary SME for ETL development, deployment and platform optimization.',
      'Directed the Data & AI 101 Community of Practice, a network of 1,000+ Accenture employees.',
    ],
  },
  {
    role: 'Database Analyst',
    earlierRole: null as string | null,
    org: 'Minerva Knowledge Management, LLC, Seattle, WA',
    dates: '10/2019 – 02/2022',
    points: [
      'Designed structured, traceable database systems that standardized client product development, quality and sustaining processes.',
      'Built automated business workflows using APIs to connect application data with platforms such as Salesforce and SharePoint.',
      'Led QuickBase and PowerApps training sessions for hundreds of attendees.',
    ],
  },
];

export const projects = [
  {
    name: 'MySpotify Insights',
    url: 'https://github.com/RGPeart/myspotify-insights' as string | null,
    blurb:
      'End-to-end data pipeline and music recommendation engine built on my own Spotify listening data.',
    points: [
      'Medallion (bronze, silver, gold) pipeline orchestrated with Apache Airflow; gold layer modelled in SQL with dbt on DuckDB.',
      'Pydantic schema contracts enforce silver and gold datasets at run time and are checked by tests; dbt data tests cover the gold models.',
      'Structured logging with structlog and lineage tracking with OpenLineage and Marquez.',
      'Hybrid recommender (scikit-learn) served through FastAPI, with a Streamlit dashboard.',
    ],
    stack: ['Python', 'Airflow', 'dbt', 'DuckDB', 'Azure Blob Storage', 'FastAPI', 'Streamlit', 'OpenLineage'],
  },
  {
    name: 'Magic Formula stock screener',
    // Link to be added once the repository is public.
    url: null as string | null,
    blurb:
      'Python tool that recommends undervalued stocks using the Magic Formula from Joel Greenblatt’s "The Little Book That Beats The Market".',
    points: [],
    stack: ['Python'],
  },
];

// `icon` is a name from @iconify-json/logos; tools without a logo there get a text badge (`badge`).
export type Skill = { name: string; icon?: string; badge?: string };

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: 'Cloud and warehousing',
    items: [
      { name: 'Azure', icon: 'azure-icon' },
      { name: 'Databricks', icon: 'databricks-icon' },
      { name: 'Snowflake', icon: 'snowflake-icon' },
      { name: 'Google BigQuery', icon: 'google-cloud' },
    ],
  },
  {
    group: 'Programming',
    items: [
      { name: 'SQL', badge: 'SQL' },
      { name: 'Python', icon: 'python' },
      { name: 'R', icon: 'r-lang' },
      { name: 'Java', icon: 'java' },
    ],
  },
  {
    group: 'Orchestration and ETL',
    items: [
      { name: 'Azure Data Factory', badge: 'ADF' },
      { name: 'Airflow', icon: 'airflow-icon' },
      { name: 'Informatica', badge: 'In' },
      { name: 'dbt', icon: 'dbt-icon' },
    ],
  },
  {
    group: 'Visualization',
    items: [
      { name: 'Power BI', icon: 'microsoft-power-bi' },
      { name: 'Tableau', icon: 'tableau-icon' },
    ],
  },
];

// Practices rather than tools, so they render as chips instead of logo cards.
export const practices = ['Data warehousing', 'Data migration', 'ETL development'];

export const education = {
  school: 'University of Washington, Seattle, WA',
  degree: 'B.S. Informatics, class of 2019',
  note: 'Dean’s List 2016–2019',
};

export const certifications = [
  'Snowflake SnowPro Core Certification',
  'Microsoft Azure Fundamentals Certification',
  'Microsoft Azure Data Fundamentals Certification',
  'QuickBase Expert Builder Certification',
];
