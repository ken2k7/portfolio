// Single source of truth for all site content.
// Every fact here was supplied by Kenil. Do not add metrics, dates or outcomes that are not here.

export const site = {
  name: 'Kenil Gandhi',
  title: 'Kenil Gandhi. Computer science at NUS',
  description:
    'Kenil Gandhi is a computer science student at the National University of Singapore, from Qatar, who builds full-stack and applied-AI software that keeps every fact tied to its source. Founder of MediGraph.',
  url: 'https://kenil-gandhi.vercel.app',
  email: 'e1714042@u.nus.edu',
  linkedin: 'https://www.linkedin.com/in/kenil-gandhi-532083220',
  github: 'https://github.com/ken2k7',
  resume: '/Kenil_Gandhi_Resume.pdf',
};

export const hero = {
  sentence:
    'A computer science student at NUS, from Qatar, who builds software that keeps every fact tied to the document it came from.',
};

export const folders = [
  { id: 'contact', name: 'Contact', hint: 'Email, LinkedIn, GitHub and the resume' },
  { id: 'education', name: 'Education', hint: 'NUS, Harvard CS50x, activities and awards' },
  { id: 'skills', name: 'Skills', hint: 'Languages, tools, AI and optimisation' },
  { id: 'about', name: 'About', hint: 'A short letter' },
];

export const workIntro = 'Four files: two products, an internship and a course project.';

export type WorkFile = {
  id: string;
  name: string;
  kind: string;
  figure: 'medigraph' | 'infrasync' | 'kgisl' | 'kenbot';
  summary: string;
  points: string[];
  stack: string;
  links?: { label: string; href: string }[];
};

export const workFiles: WorkFile[] = [
  {
    id: 'medigraph',
    name: 'MediGraph',
    kind: 'Founder and full-stack engineer, since August 2026',
    figure: 'medigraph',
    summary:
      'A health-tech platform that rebuilds a patient’s history from prescriptions and discharge summaries, with every fact linked to the characters it came from. I started it after watching caregivers coordinate treatment across unrelated clinics with no single record of diagnoses, medicines, tests and follow-ups.',
    points: [
      'A graph of 11 node types and 10 relationship types. Open a condition and see its visits, medication changes, tests, and the source document behind each fact.',
      'LLM extraction at about 20 seconds per document, with a character-level link from each extracted fact to its source text.',
      'The data model was reviewed with a practising physician in Qatar, which added separate inpatient admissions and tracking of blood pressure, HbA1c and creatinine over time.',
      'It never infers that a medication was stopped, never interprets a lab result, and never makes a clinical statement it cannot trace. Uncertain items go to the caregiver.',
      'Duplicate-document detection, 35 automated checks, a WCAG AA accessibility audit, and tooling for supervised user testing.',
    ],
    stack: 'TypeScript, React, Node.js, Hono, SQLite, Claude and Gemini APIs.',
    // TODO(kenil): add a public link for MediGraph if one should be shown.
  },
  {
    id: 'infrasync',
    name: 'InfraSync',
    kind: 'Nebius and NVIDIA Global AI Hackathon, October 2026, team of two',
    figure: 'infrasync',
    summary:
      'A planner that schedules a city’s road, water, drainage and fibre works together, so a street is dug once for several jobs instead of once per job. The solver makes every decision; a language model only explains it; a person approves each change.',
    points: [
      'A CP-SAT model with six hard constraints: task ordering, crew capacity, pavement-cut moratoria, funding windows, parallel-corridor traffic limits and engineering compatibility. It decides when a shared trench actually saves money.',
      'A FastAPI backend with a Pydantic-validated data model and endpoints for planning, disruption replanning and human approve or reject. Unsolvable scenarios fall back to the baseline plan.',
      'NVIDIA Nemotron writes the plain-English explanation from the solver’s own numbers. It schedules nothing.',
      'On a synthetic district of 11 projects across 6 streets it found $115K of trench-sharing savings and 12 fewer road-closure days, and correctly rejected the trap cases we planted.',
    ],
    stack: 'Python, FastAPI, Google OR-Tools CP-SAT, Pydantic, NVIDIA Nemotron on Nebius Token Factory, React, TypeScript, Leaflet.',
    // TODO(kenil): add a repository or demo link for InfraSync if one should be shown.
  },
  {
    id: 'kgisl',
    name: 'KGiSL',
    kind: 'Software engineering intern, AI and data. May to July 2026, remote',
    figure: 'kgisl',
    summary:
      'Three months on the AI and data team, working on document extraction, a weather-risk ingestion layer and an internal research dashboard.',
    points: [
      'Built a Python and SQLite test harness to evaluate Claude API extraction on unstructured motor-insurance claims, and wrote up the practical limits of intelligent document processing.',
      'Integrated the OpenWeatherMap REST API into a Python weather-risk ingestion layer inside Marvel.ai’s microservices.',
      'Delivered three interactive views for an internal research dashboard in React, Vite and TypeScript, including a CSS Grid timeline that holds its layout without measuring the DOM.',
    ],
    stack: 'Python, SQLite, Claude API, React, Vite, TypeScript.',
  },
  {
    id: 'kenbot',
    name: 'Kenbot',
    kind: 'CS2103T Software Engineering, individual project',
    figure: 'kenbot',
    summary:
      'A Java and JavaFX task-manager chatbot for to-dos, deadlines, events, tags and search, with a terminal mode.',
    points: [
      '193 JUnit tests, Checkstyle, and GitHub Actions CI on Ubuntu, macOS and Windows.',
    ],
    stack: 'Java, JavaFX, JUnit, GitHub Actions.',
    links: [
      { label: 'Repository on GitHub', href: 'https://github.com/ken2k7/ip' },
      { label: 'User guide', href: 'https://ken2k7.github.io/ip/' },
    ],
  },
];

export const letter = {
  paragraphs: [
    'I grew up in Qatar and moved to Singapore for university. I am in my second year of the Bachelor of Computing in Computer Science at NUS, and I expect to graduate in May 2029.',
    'Most of what I build sits where software meets a messy real-world record: a caregiver’s folder of prescriptions, a city’s dig schedule, an insurer’s claim files. I like systems that can show where each fact came from, because that is what lets a person check them.',
    'Outside code I debate, speak and make things. Three Model United Nations conferences, a year as treasurer of a Toastmasters club, and the visual materials for the NUS Student Life Fair. I am teaching myself quantitative finance from Paul Wilmott’s introduction.',
    'I am interested in software engineering, AI systems, health tech, entrepreneurship and quantitative finance. If any of that overlaps with what you are doing, write to me.',
  ],
  signature: 'Kenil Gandhi',
  role: 'Year 2, Computer Science, National University of Singapore',
};

export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'] },
  {
    group: 'Frameworks and tools',
    items: ['React', 'Vite', 'Node.js', 'Hono', 'FastAPI', 'Pydantic', 'SQLite', 'Leaflet', 'Git'],
  },
  {
    group: 'AI and optimisation',
    items: ['Claude API', 'Gemini API', 'NVIDIA Nemotron', 'Google OR-Tools CP-SAT', 'LLM document extraction'],
  },
  {
    group: 'Engineering',
    items: ['REST APIs', 'Graph data modelling', 'Constraint optimisation', 'Automated testing', 'Web accessibility, WCAG AA'],
  },
  {
    group: 'Design and media',
    items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  { group: 'Spoken languages', items: ['English', 'Hindi', 'Gujarati', 'German, Goethe-Institut A2'] },
];

export const record = {
  school: 'National University of Singapore',
  degree: 'Bachelor of Computing in Computer Science. Expected May 2029.',
  groups: [
    {
      name: 'Coursework',
      items: [
        { left: 'Software Engineering', right: 'CS2103T' },
        { left: 'Computer Organisation', right: 'CS2100' },
        { left: 'Data Structures and Algorithms', right: 'CS2040S' },
        { left: 'Programming Methodology II', right: 'CS2030S' },
        { left: 'Discrete Structures', right: 'CS1231S' },
        { left: 'Linear Algebra', right: 'MA1522' },
      ],
    },
    {
      name: 'Harvard CS50x',
      items: [
        { left: 'Introduction to Computer Science', right: 'CS50x' },
        { left: 'Introduction to Artificial Intelligence with Python', right: 'CS50 AI' },
      ],
    },
    {
      name: 'Self-study',
      items: [
        {
          left: 'Quantitative finance',
          right: 'Wilmott',
          note: 'Binomial and Black-Scholes option pricing, stochastic asset models, hedging and the Greeks, finite-difference and Monte Carlo methods.',
        },
      ],
    },
    {
      name: 'Leadership and activities',
      items: [
        { left: 'NUSSU Student Life Council, publicity executive', right: '2026', note: 'Visual materials for the NUS Student Life Fair.' },
        { left: 'Model United Nations delegate', right: '2022 to 2024', note: 'Three conferences including GCIMUN in New York. Co-authored resolutions and led bloc negotiations.' },
        { left: 'Toastmasters, EF Gavels Club, Qatar, treasurer', right: '2023 to 2024', note: 'Third place in a speech competition.' },
        { left: 'Qatar Schools Debate League', right: '2021 to 2022', note: 'Ranked 7th of more than 150 speakers.' },
      ],
    },
    {
      name: 'Awards',
      items: [
        { left: 'First of 76 teams, as team lead. Carnegie Mellon University Qatar Pi Day', right: '2025' },
        { left: 'Semifinalist, IIT Bombay E-Cell Eureka Junior, national startup competition', right: '2021' },
        { left: 'JEE Advanced All India Rank 6,351. CBSE Class XII school topper, 97.6%', right: 'School' },
      ],
    },
  ],
  closing: ['Grew up in Qatar.', 'Lives in Singapore.'],
};

export const contact = {
  message: 'Email is the fastest way to reach me. I am in Singapore, so expect a reply on Singapore time.',
};
