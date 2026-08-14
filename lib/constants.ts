export const PERSONAL = {
  name: "Milon Mia",
  title: "Full-Stack Developer",
  tagline: "Backend-focused. AI-integrated. Production-ready.",
  summary:
    "I build scalable backend systems and AI-integrated applications that solve real business problems. With 1+ year of professional experience at an international agency, I specialize in turning complex requirements into clean, performant, and maintainable code — from architecture through deployment.",
  email: "dev.milon923@gmail.com",
  phone: "+88 013 3079-2338",
  location: "Jamalpur, Bangladesh",
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
    value: 1,
    suffix: "+",
    description: "Professional development experience",
  },
  {
    label: "Projects Delivered",
    value: 6,
    suffix: "+",
    description: "Full-stack applications shipped",
  },
  {
    label: "API Performance Boost",
    value: 40,
    suffix: "%",
    description: "Achieved via optimization & caching",
  },
  {
    label: "International Clients",
    value: 7,
    suffix: "+",
    description: "Across multiple countries",
  },
];

export const CLIENT_COUNTRIES = [
  { name: "United States", flag: "🇺🇸", code: "us" },
  { name: "United Kingdom", flag: "🇬🇧", code: "gb" },
  { name: "Australia", flag: "🇦🇺", code: "au" },
  { name: "Bangladesh", flag: "🇧🇩", code: "bd" },
  { name: "India", flag: "🇮🇳", code: "in" },
];

export const PROJECTS = [
  {
    id: "wordgame",
    name: "Word Game",
    subtitle: "Realtime Word Game Platform",
    description:
      "Real-time multiplayer word-chain platform engineered with event-driven WebSockets (Socket.IO). Features room-based state synchronization, turn-based timer enforcement, and automated validation via external Dictionary APIs for low-latency, cheat-resistant gameplay.",
    problem:
      "Creating a fair and seamless real-time multiplayer word game with accurate word validation, synchronized gameplay, and automatic rule enforcement.",
    contribution:
      "Developed a real-time multiplayer word chain game featuring room-based gameplay, live synchronization, automatic turn management, and Dictionary API integration for accurate English word validation and fair scoring.",
    impact:
      "Delivered a responsive and cheat-resistant multiplayer experience by automating game rules, eliminating manual validation, and keeping both players synchronized in real time, resulting in smooth, fair, and engaging gameplay.",
    technologies: [
      "Typescript",
      "Dictionary API",
      "HTML",
      "Socket.IO",
      "CSS",
      "Javascript",
    ],
    liveUrl: "https://word-game-client.vercel.app",
    sourceUrl: "https://github.com/devmilon923/Word-Game",
    category: "Full-Stack Platform",
  },
  {
    id: "storyboard",
    name: "Storyboard",
    subtitle: "Social Blogging Platform",
    description:
      "High-throughput social blogging engine built with Next.js 14 and PostgreSQL. Features cursor-based feed pagination, Redis/BullMQ background job queues for async notification processing, and OTP-authenticated Role-Based Access Control (RBAC).",
    problem:
      "Most blogging platforms sacrifice either scalability or developer experience. Storyboard needed to handle personalized feeds, threaded discussions, and async notifications without degrading under load.",
    contribution:
      "Led the complete full-stack architecture — designed the PostgreSQL schema with cursor-based pagination, built the async job system with Redis/BullMQ for feed generation and notifications, and implemented OTP-based auth with RBAC.",
    impact:
      "Production-grade platform handling personalized feeds, real-time notifications, threaded comments, bookmarks, and follower graphs at scale.",
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "React",
      "TypeScript",
    ],
    liveUrl: "https://storiboard.vercel.app",
    sourceUrl: "https://github.com/devmilon923/Storiboard-UI",
    category: "Full-Stack Platform",
  },

  {
    id: "heirloom",
    name: "Heirloom",
    subtitle: "AI-Powered Conversational System",
    description:
      "Multi-tenant AI agent system featuring a dual-memory pipeline. Integrates OpenAI embeddings with Pinecone vector databases for long-term semantic memory retrieval, sub-second context searching, and isolated multi-session persistence.",
    problem:
      "Standard chatbots lose context between sessions and cannot personalize at scale. Heirloom required persistent memory retrieval across conversations while supporting concurrent multi-tenant sessions without cross-contamination.",
    contribution:
      "Architected the entire backend: RAG pipeline with OpenAI and Pinecone, dual-memory system (Redis for short-term, vector DB for long-term), automated embedding generation, and isolated multi-tenant session management.",
    impact:
      "Semantic memory retrieval pipeline handling concurrent users with isolated conversational contexts and sub-second semantic search responses.",
    technologies: [
      "Node.js",
      "TypeScript",
      "OpenAI API",
      "Pinecone",
      "RAG Architecture",
      "Redis",
      "BullMQ",
      "MongoDB",
    ],
    liveUrl: null,
    sourceUrl: "https://github.com/devmilon923/Heirloom-App-Backend",
    category: "Backend + AI Infrastructure",
  },
];

export const SERVICES = [
  {
    id: "bug-fix",
    icon: "bug",
    title: "Bug Fix & Optimization",
    description:
      "Fast, precise diagnosis and resolution of frontend and backend bugs. Performance audits, responsive fixes, refactoring, and code quality improvements.",
    features: [
      "UI/UX bug fixes and responsive issues",
      "API performance optimization",
      "Database query tuning and indexing",
      "Code refactoring and cleanup",
      "React re-render optimization",
      "Memory leak detection and resolution",
    ],
    price: "Contact for Quote",
    badge: "Quick Turnaround",
  },
  {
    id: "mvp-saas",
    icon: "rocket",
    title: "MVP SaaS Development",
    description:
      "Full end-to-end SaaS product development — from schema design and authentication to dashboards, payment integration, and cloud deployment. Shipped fast, built to scale.",
    features: [
      "Authentication & authorization systems",
      "Admin & user dashboards",
      "REST API & database architecture",
      "Third-party API integrations",
      "Subscription & payment flows",
      "AWS/Vercel/DigitalOcean deployment",
    ],
    price: "Contact for Quote",
    badge: "Most Popular",
  },
  {
    id: "custom",
    icon: "layers",
    title: "Custom Solutions",
    description:
      "Complex, bespoke software engineered for specific business requirements — AI integrations, automation pipelines, enterprise backends, and technical consulting.",
    features: [
      "AI-powered features (RAG, embeddings, OpenAI)",
      "Business process automation",
      "Real-time systems with Socket.IO",
      "Background job processing (BullMQ, Redis)",
      "Enterprise backend architecture",
      "Technical consulting & code review",
    ],
    price: "Contact for Quote",
    badge: "Advanced",
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
    text: "Milon delivered a production-grade SaaS backend in under 3 weeks. The architecture was clean, well-documented, and the API performance exceeded our benchmarks. He's one of the most thorough backend developers I've worked with remotely.",
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
    text: "We needed a full-stack developer who could handle both React and Node.js without compromising either. Milon delivered exactly that — a polished frontend with a robust backend, deployed to AWS with no drama. Will work with him again.",
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
