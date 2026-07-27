// Cinematic scenario data and response map

const HELP_RESPONSE = {
  text: "Here's everything you can ask me on this page:",
  list: [
    "→ 'what can you do' — see my full capability list",
    "→ 'get me ready for my day' — morning briefing demo",
    "→ 'build me a kanban board' — watch NORVA build an app",
    "→ 'build me a rest api' — scaffold an Express backend",
    "→ 'clear my downloads folder' — file organization demo",
    "→ 'what's on my calendar today' — daily briefing",
    "→ 'summarize my unread emails' — email summary",
    "→ 'run my dev environment' — launch dev workspace",
    "→ 'archive old screenshots' — clean desktop",
    "→ 'push to github' — zero-git deployment",
    "→ 'download norva' — join the waitlist",
    "→ 'join waitlist' — get early access",
    "→ 'who made you' — meet the team",
    "→ '/help' — show this list again anytime",
  ],
}

export const RESPONSES = {
  'what can you do': {
    text: "Here's what I can handle right now:",
    list: [
      'Build full-stack web apps from a single prompt — React, Vite, Express, with Docker databases',
      'Organize your files and folders using native OS APIs',
      'Draft and send emails in your tone',
      'Manage your calendar and daily briefings',
      'Push finished projects directly to GitHub',
      'More workflows coming very soon...',
    ],
  },
  'get me ready for my day': {
    text: "Good morning. Here's your day: 3 meetings — first at 10AM. 12 unread emails, 2 flagged important. Your dev server from yesterday is still running on port 3000. Want me to draft replies to the flagged emails?",
  },
  'build me a kanban board': {
    text: 'On it. Scaffolding React + Vite, provisioning Postgres via Docker, writing API routes...',
    terminal: [
      '[OK] Planner model loaded — Qwen 1.5B LoRA',
      '[OK] Docker Postgres container provisioned',
      '[OK] Scaffolding React + Vite + Tailwind...',
      '[OK] Writing API routes and schema...',
      '[OK] Headless browser test — PASSED',
      '[LIVE] App running at localhost:5173',
    ],
  },
  'build a kanban board': {
    text: 'On it. Scaffolding React + Vite, provisioning Postgres via Docker, writing API routes...',
    terminal: [
      '[OK] Planner model loaded — Qwen 1.5B LoRA',
      '[OK] Docker Postgres container provisioned',
      '[OK] Scaffolding React + Vite + Tailwind...',
      '[OK] Writing API routes and schema...',
      '[OK] Headless browser test — PASSED',
      '[LIVE] App running at localhost:5173',
    ],
  },
  'rest api': {
    text: 'Architecting Express + Node.js REST API with CORS and validation middleware...',
    terminal: [
      '[OK] Scaffolding Express API structure',
      '[OK] Creating REST endpoints (/api/v1/resources)',
      '[OK] Generating Swagger/OpenAPI documentation',
      '[LIVE] API server active on localhost:3001',
    ],
  },
  'express': {
    text: 'Architecting Express + Node.js REST API with CORS and validation middleware...',
    terminal: [
      '[OK] Scaffolding Express API structure',
      '[OK] Creating REST endpoints (/api/v1/resources)',
      '[OK] Generating Swagger/OpenAPI documentation',
      '[LIVE] API server active on localhost:3001',
    ],
  },
  'calendar': {
    text: "Here's your calendar for today: 10:00 AM — Sync with Bhumi. 2:30 PM — Code Review with Shivam. 5:00 PM — Architecture planning. All 3 events are synced with native macOS Calendar.",
  },
  'unread emails': {
    text: 'Found 6 unread emails. 2 require your review: 1. Shivam sent updated API schemas. 2. Beta waitlist signup milestone reached. Should I draft quick responses?',
  },
  'who emailed me': {
    text: 'You received 4 emails today: Shivam Wadatkar (Dev update), Bhumi Chavan (Product roadmap), GitHub (Repo activity), and Vercel (Deployment report).',
  },
  'dev environment': {
    text: 'Launching your dev workspace...',
    terminal: [
      '[OK] Starting Docker containers (Postgres, Redis)',
      '[OK] Running Vite dev server on :5174',
      '[OK] Connecting local model pipeline',
      '[READY] Workspace running & ready for coding',
    ],
  },
  'screenshots': {
    text: 'Scanning ~/Desktop for screenshots... Found 28 files. Creating ~/Desktop/Archive/Screenshots/2026-07/ and moving old screenshots. Desktop cleared!',
  },
  'download norva': {
    text: "Join the waitlist. Once it is live, we'll notify you through your email.",
    action: 'showEmailInput',
  },
  'join waitlist': {
    text: "Drop your email below and you'll be first to know when beta drops.",
    action: 'showEmailInput',
  },
  'light mode': {
    text: 'Switching to light mode...',
    action: 'switchTheme',
    theme: 'light',
  },
  'dark mode': {
    text: 'Back to the void.',
    action: 'switchTheme',
    theme: 'dark',
  },
  'who made you': {
    text: "Built by two CS majors who got tired of doing everything manually. Bhumi Chavan handles vision & planning. Shivam Wadatkar handles engineering & systems. Between the two of us — one thinks it, one ships it. Check out our founder cards right below the capabilities section!",
  },
  'who built this': {
    text: "Built by two CS majors who got tired of doing everything manually. Bhumi Chavan handles vision & planning. Shivam Wadatkar handles engineering & systems. Between the two of us — one thinks it, one ships it. Check out our founder cards right below the capabilities section!",
  },
  team: {
    text: "Built by two CS majors who got tired of doing everything manually. Bhumi Chavan handles vision & planning. Shivam Wadatkar handles engineering & systems. Between the two of us — one thinks it, one ships it. Check out our founder cards right below the capabilities section!",
  },
  founders: {
    text: "Built by two CS majors who got tired of doing everything manually. Bhumi Chavan handles vision & planning. Shivam Wadatkar handles engineering & systems. Between the two of us — one thinks it, one ships it. Check out our founder cards right below the capabilities section!",
  },
  help: HELP_RESPONSE,
  '/help': HELP_RESPONSE,
  done: {
    text: 'Already on it. Was there something else you needed handled?',
  },
  yes: {
    text: 'Good. What do you need done?',
  },
  ok: {
    text: "What's next?",
  },
  thanks: {
    text: "Anytime. That's what I'm here for.",
  },
  'clear my downloads folder': {
    text: 'Scanning ~/Downloads... 47 files found. Archiving PDFs by project, moving misc files to Trash. Done — 47 → 0 files in 3.2s.',
  },
  'draft a reply': {
    text: "Reading the latest thread... Got the context. Drafting a reply in your tone now. Want me to open Mail when it's ready?",
  },
  'organize my files': {
    text: "Scanning your directories... Categorizing by project context. This will take about 8 seconds on a real machine. On this page, just imagine it's done. 😄",
  },
  'push to github': {
    text: "Initiating JIT OAuth flow... Once authenticated, I'll push to a new repo automatically. You won't need to touch a single git command.",
  },
  hello: { text: 'Hey. Tell me what you need handled.' },
  hey: { text: 'Hey. Tell me what you need handled.' },
  default: {
    text: "Got it. I can't do that on this page yet — but I will be able to on your machine. Type 'what can you do' to see what I'm capable of, or 'join waitlist' to get beta access.",
  },
}

export function getResponse(input) {
  const lower = input.toLowerCase().trim()
  // Priority: specific phrases first
  const keys = Object.keys(RESPONSES).filter(k => k !== 'default')
  // Sort longer keys first for specificity
  keys.sort((a, b) => b.length - a.length)
  for (const key of keys) {
    if (lower.includes(key)) return { key, ...RESPONSES[key] }
  }
  return { key: 'default', ...RESPONSES.default }
}

// Cinematic scenarios
export const SCENARIOS = [
  {
    prompt: 'Get me ready for my day',
    responseKey: 'get me ready for my day',
  },
  {
    prompt: 'Build me a kanban board with React and Postgres',
    responseKey: 'build me a kanban board',
  },
  {
    prompt: 'Clear downloads, archive PDFs, organize by project',
    response: {
      text: 'On it. Scanning your Downloads folder...',
      terminal: [
        '[OK] Scanning ~/Downloads... 47 files found',
        '[OK] Identified 12 PDFs — categorizing by project name',
        '[OK] Moving files to ~/Projects/[project-name]/docs/',
        '[OK] 35 misc files moved to Trash',
        '[DONE] Downloads folder: 47 → 0 files in 3.2s',
      ],
    },
  },
]

export const PLACEHOLDER_CYCLE = [
  'Get me ready for my day...',
  'Build me a kanban board...',
  'Clear my downloads folder...',
  "Draft a reply to Shivam's email...",
  'Why Local AI?',
]
