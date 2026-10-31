// Single source of truth for all site content.
// Every fact here was supplied by Kenil. Do not add metrics or dates that are not here.

export const site = {
  name: 'Kenil Gandhi',
  title: 'Kenil Gandhi — Computer Science at NUS',
  description:
    'Kenil Gandhi is a Computer Science student at the National University of Singapore who builds full-stack and applied-AI products. Founder of MediGraph. Interested in software engineering, AI systems, health tech, entrepreneurship and quantitative finance.',
  url: 'https://kenil-gandhi.vercel.app',
  email: 'e1714042@u.nus.edu',
  linkedin: 'https://www.linkedin.com/in/kenil-gandhi-532083220',
  github: 'https://github.com/ken2k7',
  resume: '/Kenil_Gandhi_Resume.pdf',
  location: 'Singapore',
  origin: 'Qatar',
  timezone: 'Asia/Singapore',
};

export const hero = {
  headline: 'I build full-stack and applied-AI products that show their working.',
  sub: 'Year 2 Computer Science at the National University of Singapore. Founder of MediGraph.',
};

export const about = [
  'I am a second-year Computer Science student at the National University of Singapore, reading for a Bachelor of Computing and expecting to graduate in May 2029. I grew up in Qatar and live in Singapore.',
  'Most of what I build sits where software meets a messy real-world system: a caregiver’s folder of prescriptions, a city’s dig schedule, an insurer’s claim files. I like products that make their reasoning visible, where every number has a source and every decision has a reason a person can check.',
  'I am interested in software engineering, AI systems, health tech, entrepreneurship and quantitative finance. Right now most of my time goes into MediGraph.',
];

export const experience = [
  {
    company: 'KGiSL',
    role: 'Software Engineering Intern, AI and Data',
    where: 'Remote',
    when: 'May – Jul 2026',
    bullets: [
      'Built a Python and SQLite test harness to evaluate Claude API extraction on unstructured motor-insurance claims, and documented the practical limits of intelligent document processing.',
      'Integrated the OpenWeatherMap REST API into a Python weather-risk ingestion layer in Marvel.ai’s microservices.',
      'Delivered three interactive views for an internal research dashboard in React, Vite and TypeScript, including a custom CSS Grid timeline that prevented layout drift without DOM measurements.',
    ],
  },
];

export type CaseStudy = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  role: string;
  when: string;
  summary: string;
  why: string;
  built: string[];
  guardrails?: string;
  facts: { value: string; label: string }[];
  factsNote?: string;
  stack: string[];
  links?: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'medigraph',
    index: '01',
    name: 'MediGraph',
    kicker: 'Health tech',
    role: 'Founder and Full-Stack Engineer',
    when: 'Aug 2026 – present',
    summary:
      'A health-tech platform that reconstructs a source-traceable patient history from prescriptions and clinical documents.',
    why: 'I started MediGraph after watching caregivers coordinate treatment across unrelated clinics with no single record of diagnoses, medicines, tests and follow-ups. The aim is one history where every fact points back to the document it came from.',
    built: [
      'A graph data model with 11 node types and 10 relationship types. Open a condition and see its related visits, medication changes, tests, and the source document behind each fact.',
      'LLM extraction for prescriptions and discharge summaries, at about 20 seconds per file, with a character-level link from every extracted fact to its source text.',
      'A data model reviewed with a practising physician in Qatar, which led to separate inpatient-admission modelling and tracking of blood pressure, HbA1c and creatinine over time.',
      'Duplicate-document detection, 35 automated checks, a WCAG AA accessibility audit and tooling for supervised user testing.',
    ],
    guardrails:
      'MediGraph never infers that a medication was stopped, never interprets lab results and never makes a clinical statement it cannot trace. Anything uncertain is routed to caregiver review.',
    facts: [
      { value: '11', label: 'node types' },
      { value: '10', label: 'relationship types' },
      { value: '~20 s', label: 'per document' },
      { value: '35', label: 'automated checks' },
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Hono', 'SQLite', 'Claude API', 'Gemini API'],
    // TODO(kenil): add a live URL or repository link for MediGraph if one should be public.
  },
  {
    id: 'infrasync',
    index: '02',
    name: 'InfraSync',
    kicker: 'Constraint optimisation',
    role: 'AI-assisted infrastructure sequencing planner, team of 2',
    when: 'Nebius × NVIDIA Global AI Hackathon, 1 – 30 Oct 2026',
    summary:
      'Schedules a city’s road, water, drainage and fibre works together, so each street is dug once for several jobs instead of once per job.',
    why: 'Utilities plan their works separately, so the same street gets opened again and again. InfraSync puts every job on one schedule and lets a solver decide when sharing a trench actually saves money.',
    built: [
      'A CP-SAT scheduling model with six hard constraints: task ordering, crew capacity, pavement-cut moratoria, funding windows, parallel-corridor traffic limits and engineering compatibility.',
      'A FastAPI backend with a Pydantic-validated data model and endpoints for planning, disruption replanning and human approve/reject. Unsolvable scenarios fall back to the baseline plan.',
      'A clear division of labour: the solver makes every decision, NVIDIA Nemotron explains the plan in plain English using the solver’s actual numbers, and a human approves each change.',
      'A React, TypeScript and Leaflet front end that shows the plan on a map, street by street.',
    ],
    guardrails:
      'The language model never schedules anything. It only narrates numbers the solver has already produced, and every change waits for a person to approve it.',
    facts: [
      { value: '6', label: 'hard constraints' },
      { value: '$115K', label: 'trench-sharing savings' },
      { value: '12', label: 'fewer road-closure days' },
    ],
    factsNote:
      'Savings measured on a synthetic district of 11 projects across 6 streets. The planner also correctly rejected deliberate trap cases.',
    stack: [
      'Python',
      'FastAPI',
      'Google OR-Tools (CP-SAT)',
      'Pydantic',
      'NVIDIA Nemotron',
      'Nebius Token Factory',
      'React',
      'TypeScript',
      'Leaflet',
    ],
    // TODO(kenil): add a repository or demo link for InfraSync if one should be public.
  },
];

export const smallProjects = [
  {
    name: 'Kenbot',
    kicker: 'CS2103T individual project',
    summary:
      'A Java and JavaFX task-manager chatbot for to-dos, deadlines, events, tags and search, with a terminal mode. 193 JUnit tests, Checkstyle, and GitHub Actions CI on Ubuntu, macOS and Windows.',
    stack: ['Java', 'JavaFX', 'JUnit', 'GitHub Actions'],
    links: [
      { label: 'Repository', href: 'https://github.com/ken2k7/ip' },
      { label: 'User guide', href: 'https://ken2k7.github.io/ip/' },
    ],
  },
];

export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'] },
  {
    group: 'Frameworks and tools',
    items: ['React', 'Vite', 'Node.js', 'Hono', 'FastAPI', 'Pydantic', 'SQLite', 'Leaflet', 'Git'],
  },
  {
    group: 'AI and optimisation',
    items: ['Claude API', 'Gemini API', 'NVIDIA Nemotron', 'Google OR-Tools (CP-SAT)', 'LLM document extraction'],
  },
  {
    group: 'Engineering',
    items: ['REST APIs', 'Graph data modelling', 'Constraint optimisation', 'Automated testing', 'Web accessibility (WCAG AA)'],
  },
  {
    group: 'Design and media',
    items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  { group: 'Spoken', items: ['English', 'Hindi', 'Gujarati', 'German (Goethe-Institut A2)'] },
];

export const education = {
  school: 'National University of Singapore',
  degree: 'Bachelor of Computing in Computer Science',
  when: 'Expected May 2029',
  coursework: [
    { code: 'CS2103T', name: 'Software Engineering' },
    { code: 'CS2100', name: 'Computer Organisation' },
    { code: 'CS2040S', name: 'Data Structures and Algorithms' },
    { code: 'CS2030S', name: 'Programming Methodology II' },
    { code: 'CS1231S', name: 'Discrete Structures' },
    { code: 'MA1522', name: 'Linear Algebra' },
  ],
};

export const learning = [
  {
    title: 'Harvard CS50x',
    detail: 'Introduction to Computer Science, and CS50’s Introduction to Artificial Intelligence with Python.',
  },
  {
    title: 'Quantitative finance, self-study',
    detail:
      'Working through Paul Wilmott Introduces Quantitative Finance: binomial and Black-Scholes option pricing, stochastic asset models, hedging and the Greeks, finite-difference and Monte Carlo methods.',
  },
];

export const leadership = [
  {
    org: 'NUSSU Student Life Council',
    role: 'Publicity Executive',
    when: 'Jan – May 2026',
    detail: 'Produced visual materials for the NUS Student Life Fair.',
  },
  {
    org: 'Model United Nations',
    role: 'Delegate',
    when: '2022 – 2024',
    detail: 'Three conferences including GCIMUN in New York. Co-authored resolutions and led bloc negotiations.',
  },
  {
    org: 'Toastmasters, EF Gavels Club, Qatar',
    role: 'Treasurer',
    when: '2023 – 2024',
    detail: 'Third place in a speech competition.',
  },
  {
    org: 'Qatar Schools Debate League',
    role: 'Speaker',
    when: '2021 – 2022',
    detail: 'Ranked 7th of more than 150 speakers.',
  },
];

export const awards = [
  {
    year: '2025',
    title: 'First of 76 teams, as team lead',
    where: 'Carnegie Mellon University Qatar Pi Day',
  },
  {
    year: '2021',
    title: 'Semifinalist',
    where: 'IIT Bombay E-Cell Eureka Junior, national startup competition',
  },
  {
    year: 'School',
    title: 'JEE Advanced All India Rank 6,351',
    where: 'CBSE Class XII school topper, 97.6%',
  },
];

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
