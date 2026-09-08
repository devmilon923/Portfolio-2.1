export const PERSONAL = {
  name: "Milon Mia",
  title: "Full-Stack & AI Solution Engineer",
  tagline: "SaaS. AI Pipelines. Web Apps. If it exists online, I can build it.",
  summary:
    "Full-Stack Developer specializing in AI-integrated SaaS, high-throughput backend APIs, and custom web applications. Whether you need a complex platform engineered from scratch or a high-converting web app, I deliver production-grade code directly — faster, cleaner, and with zero agency overhead.",
  email: "dev.milon923@gmail.com",
  phone: "+88 013 3079-2338",
  location: "Jamalpur, Bangladesh",
  timezone: "GMT+6 ",
  responseTime: "Replies within 2 hours",
  portfolio: "https://milon.bro.bd",
  github: "https://github.com/devmilon923",
  linkedin: "https://linkedin.com/in/devmilon",
  fiverr: "https://www.fiverr.com/devmilon923",
  upwork:
    "https://www.upwork.com/freelancers/~01bd608f5c07cb250e?mp_source=share",
  resumeUrl:
    "https://drive.google.com/file/d/1PvK_85u1AuyiD-OQdLakm5oEoAaVPWkW/view?usp=drive_link",
  whatsapp: "https://wa.me/8801330792338",
};

export const CERTIFICATIONS = [
  {
    title: "Web Development",
    issuer: "Programming Hero",
    date: "Jun 2024",
    credentialId: "WEB10-1794",
    description:
      "6-month intensive MERN stack programming covering full-stack fundamentals, REST API design, authentication patterns, and cloud deployment.",
  },
];

export const EDUCATION = [
  {
    degree: "Diploma in Electrical Engineering",
    institution: "Rumdo Institute of Modern Technology",
    location: "Mymensingh, Bangladesh",
    period: "2019 – 2023",
    description:
      "4-year technical diploma program covering electrical systems, circuit analysis, and engineering fundamentals.",
  },
];

export const LANGUAGES = [
  { name: "Bengali", level: "Native", comp: "100%", speak: "100%" },
  { name: "English", level: "Conversational", comp: "85%", speak: "70%" },
  { name: "Hindi", level: "Fluent", comp: "100%", speak: "90%" },
];

export const STATS = [
  {
    label: "Years of Experience",
    value: 1.8,
    suffix: "",
    description: "Combined industry & freelance",
  },
  {
    label: "Projects Shipped",
    value: 6,
    suffix: "+",
    description: "Full-stack platforms & web apps",
  },
  {
    label: "API Performance Boost",
    value: 40,
    suffix: "%",
    description: "Average speedup via optimization",
  },
  {
    label: "International Clients",
    value: 7,
    suffix: "+",
    description: "Across US, UK, EU, & AU",
  },
];

export const CLIENT_COUNTRIES = [
  { name: "United States", flag: "🇺🇸", code: "us" },
  { name: "United Kingdom", flag: "🇬🇧", code: "gb" },
  { name: "Australia", flag: "🇦🇺", code: "au" },
  { name: "Bangladesh", flag: "🇧🇩", code: "bd" },
  { name: "India", flag: "🇮🇳", code: "in" },
];

export const WHY_SOLO_VS_AGENCY = [
  {
    id: "direct-comm",
    icon: "MessageSquare",
    title: "Direct Builder Communication",
    subtitle: "No Middlemen or Account Reps",
    description:
      "You speak directly to the developer writing your code. Zero game of telephone, zero miscommunication, and instant technical clarity.",
  },
  {
    id: "zero-overhead",
    icon: "Zap",
    title: "Zero Agency Overhead",
    subtitle: "High Quality at Lean Rates",
    description:
      "Agencies charge bloated retainers to pay for sales teams, managers, and office perks. With me, 100% of your investment goes into project",
  },
  {
    id: "rapid-execution",
    icon: "Rocket",
    title: "Rapid Execution & Agility",
    subtitle: "Shipped in Weeks, Not Months",
    description:
      "No agency bureaucracy or endless committee meetings. Fast iterations, continuous deployments, and immediate problem-solving.",
  },
  {
    id: "total-accountability",
    icon: "ShieldCheck",
    title: "100% Single-Point Accountability",
    subtitle: "Complete Ownership End-to-End",
    description:
      "One developer takes personal ownership from database architecture through cloud deployment. No passing the buck.",
  },
];

export const PROJECTS = [
  {
    id: "heirloom",
    name: "Heirloom",
    subtitle: "AI-Powered Conversational System",
    metricLabel: "Cross-Session RAG Memory Search",
    lastUpdated: "2026-03-02",
    description:
      "Multi-tenant AI infrastructure featuring a dual-memory RAG platform merging short-term conversation context with Pinecone long-term semantic memory for personalized cross-session recall.",
    problem:
      "Standard chatbots lose context between sessions and cannot personalize at scale, while synchronous embedding generation blocks API response times under load.",
    contribution:
      "Architected dual-memory RAG (Redis short-term + Pinecone vector DB) with isolated user contexts and BullMQ workers to fully decouple async embedding jobs from the main API response path.",
    impact:
      "Delivered sub-second semantic retrieval and contextually aware cross-session responses for concurrent multi-tenant users with zero response latency lag.",
    technologies: [
      "Node.js",
      "TypeScript",
      "OpenAI API",
      "Pinecone",
      "RAG Architecture",
      "Vector Embeddings",
      "Redis",
      "BullMQ",
      "MongoDB",
    ],
    liveUrl: null,
    sourceUrl: "https://github.com/devmilon923/Heirloom-App-Backend",
    category: "Backend & AI Infrastructure",
  },
  {
    id: "storyboard",
    name: "Storyboard",
    subtitle: "High-Throughput Content Publishing Engine",
    metricLabel: "Concurrent Reader Capacity",
    lastUpdated: "2026-07-17",
    description:
      "High-speed publishing platform built to handle high-traffic content feeds, real-time reader notifications, and automated user moderation without performance drops.",
    problem:
      "Traditional content platforms slowdown or crash during traffic spikes when generating personalized feeds and live notifications.",
    contribution:
      "Engineered a high-performance database schema with background job processing and Redis caching to handle feed delivery instantly.",
    impact:
      "Production-grade platform capable of serving 100k+ readers seamlessly with instant page loads and zero server downtime.",
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Redis",
      "BullMQ Queue",
      "Node.js",
      "TypeScript",
      "React",
    ],
    liveUrl: "https://storiboard.vercel.app",
    sourceUrl: "https://github.com/devmilon923/Storiboard-UI",
    category: "Full-Stack SaaS",
  },
  {
    id: "wordgame",
    name: "Word Game",
    subtitle: "Realtime Multiplayer Gaming Infrastructure",
    metricLabel: "API Response Optimization",
    lastUpdated: "2026-07-17",
    description:
      "Real-time multiplayer word-chain platform engineered with WebSockets for synchronized live state, turn enforcement, and zero-cheat rule validation.",
    problem:
      "Creating a fair, real-time multiplayer experience without latency lags, cheating, or out-of-sync room states across devices.",
    contribution:
      "Built a low-latency WebSocket event server with automated dictionary API verification and turn-based synchronization.",
    impact:
      "Delivered smooth, low-latency live gameplay with automatic rule validation, keeping players synchronized across global regions.",
    technologies: [
      "WebSockets (Socket.IO)",
      "TypeScript",
      "Node.js",
      "Dictionary API",
      "HTML5 / CSS3",
    ],
    liveUrl: "https://word-game-client.vercel.app",
    sourceUrl: "https://github.com/devmilon923/Word-Game",
    category: "Real-Time Web Apps",
  },
];

export const SERVICES = [
  {
    id: "bug-fix",
    icon: "bug",
    title: "Bug Fix & Performance",
    turnaround: "24–48 Hours",
    tagline:
      "Surgical diagnosis and performance tuning for slow, crashing, or broken web applications.",
    features: [
      {
        title: "Emergency Bug Diagnosis",
        detail: "24–48h resolution for React, Next.js & Node.js",
      },
      {
        title: "API Speed Optimization",
        detail: "Up to 40%+ database query & response time speedup",
      },
      {
        title: "Cache & Memory Tuning",
        detail: "Redis caching setup & memory leak resolution",
      },
      {
        title: "Technical Code Audit",
        detail: "Detailed post-fix technical report & code cleanup",
      },
    ],
    price: "Fixed or Hourly",
    badge: "Tactical Fix",
    featured: false,
  },
  {
    id: "mvp-saas",
    icon: "rocket",
    title: "Full-Stack SaaS & Web Apps",
    turnaround: "2–3 Weeks",
    tagline:
      "Turnkey development from database schema and REST APIs to dashboards, payments, and cloud launch.",
    features: [
      {
        title: "Custom Build Guarantee",
        detail: "Any web app or SaaS built to your exact requirements",
      },
      {
        title: "Complete Full-Stack Architecture",
        detail: "Auth, PostgreSQL/MongoDB, REST APIs & Dashboards",
      },
      {
        title: "Third-Party Integrations",
        detail: "Stripe payments, OpenAI APIs & Webhooks",
      },
      {
        title: "Production Cloud Launch",
        detail: "Deployment on Cloud or Local environment",
      },
    ],
    price: "Custom Scope",
    badge: "Flagship Build",
    featured: true,
  },
  {
    id: "custom",
    icon: "layers",
    title: "AI Systems & Automation",
    turnaround: "1–2 Weeks",
    tagline:
      "Intelligent AI workflows, RAG memory systems, and automated background data pipelines.",
    features: [
      {
        title: "AI Assistants & RAG Memory",
        detail: "Custom chatbots with long-term persistent memory",
      },
      {
        title: "Process Automation Queues",
        detail: "Background job pipelines built with BullMQ & Redis",
      },
      {
        title: "Real-Time Event Streaming",
        detail: "Low-latency WebSockets (Socket.IO) for live state sync",
      },
      {
        title: "Scalable Infrastructure",
        detail: "Enterprise backend systems built for high throughput",
      },
    ],
    price: "Custom Scope",
    badge: "Enterprise AI",
    featured: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "James Hartwell",
    position: "CTO",
    company: "LaunchPad Digital",
    country: "United Kingdom",
    rating: 5,
    text: "Delivered a production-grade SaaS backend in under 3 weeks. The architecture was clean, well-documented, and the API performance exceeded our benchmarks. He's one of the most thorough backend developers I've worked with remotely.",
    avatar: "JH",
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "Product Manager",
    company: "NovaTech Solutions",
    country: "United States",
    rating: 5,
    text: "We hired Milon to optimize our sluggish Node.js API and he reduced our average response time by nearly 40%. His Redis caching strategy and MongoDB indexing fixes were exactly what we needed. Highly recommend for backend work.",
    avatar: "SC",
  },
  {
    id: 3,
    name: "Marcus Weber",
    position: "Founder",
    company: "Streamline AI",
    country: "Germany",
    rating: 5,
    text: "The AI memory system Milon built for us is genuinely impressive — RAG pipeline, dual-memory architecture, multi-tenant isolation. He understood the requirements without extensive hand-holding and shipped a solid system on time.",
    avatar: "MW",
  },
  {
    id: 4,
    name: "Priya Kapoor",
    position: "Engineering Lead",
    company: "Orion Labs",
    country: "Canada",
    rating: 5,
    text: "Milon joined a critical phase of our project and immediately added value. His Docker + CI/CD setup eliminated our deployment headaches and his code reviews raised the whole team's quality bar. Reliable, communicative, and skilled.",
    avatar: "PK",
  },
  {
    id: 5,
    name: "Tom Nguyen",
    position: "CEO",
    company: "BuildRight Agency",
    country: "Australia",
    rating: 5,
    text: "We needed a full-stack developer who could handle both React and Node.js without compromising either. Delivered exactly that — a polished frontend with a robust backend, deployed to AWS with no drama. Will work with him again.",
    avatar: "TN",
  },
];

export const TECH_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "deployment", label: "Deployment" },
];

export const TECH_STACK = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    icon: "⚛️",
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: "▲",
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: "TS",
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: "JS",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: "🎨",
  },
  {
    name: "React Query",
    category: "frontend",
    icon: "RQ",
  },
  {
    name: "Shadcn UI",
    category: "frontend",
    icon: "◻",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    icon: "🟢",
  },
  {
    name: "Express.js",
    category: "backend",
    icon: "Ex",
  },
  {
    name: "Socket.IO",
    category: "backend",
    icon: "⚡",
  },
  {
    name: "BullMQ",
    category: "backend",
    icon: "📋",
  },
  {
    name: "GraphQL",
    category: "backend",
    icon: "◉",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    icon: "🐘",
  },
  {
    name: "MongoDB",
    category: "backend",
    icon: "🍃",
  },
  {
    name: "Redis",
    category: "backend",
    icon: "🔴",
  },
  {
    name: "Prisma",
    category: "backend",
    icon: "◇",
  },
  {
    name: "Pinecone",
    category: "backend",
    icon: "🔍",
  },
  {
    name: "OpenAI API",
    category: "backend",
    icon: "🤖",
  },

  // Deployment
  {
    name: "AWS EC2",
    category: "deployment",
    icon: "☁️",
  },
  {
    name: "Docker",
    category: "deployment",
    icon: "🐳",
  },
  {
    name: "Nginx",
    category: "deployment",
    icon: "⚙️",
  },
  {
    name: "GitHub Actions",
    category: "deployment",
    icon: "🔄",
  },
  {
    name: "Vercel",
    category: "deployment",
    icon: "▲",
  },
  {
    name: "AWS S3",
    category: "deployment",
    icon: "🪣",
  },
  {
    name: "Linux",
    category: "deployment",
    icon: "🐧",
  },
];

export const STRENGTHS = [
  {
    title: "System Architecture",
    description:
      "Designing scalable backend systems from schema to deployment with performance baked in from day one.",
  },
  {
    title: "AI Integration",
    description:
      "Building RAG pipelines, embedding systems, and semantic search that make products genuinely intelligent.",
  },
  {
    title: "API Performance",
    description:
      "MongoDB tuning, Redis caching, and query optimization that measurably cut response times.",
  },
  {
    title: "Production Deployment",
    description:
      "Docker, Nginx, AWS EC2, and GitHub Actions CI/CD — automated, reliable, and repeatable.",
  },
];
