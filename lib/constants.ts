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
};

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
  // { name: "Canada", flag: "🇨🇦", code: "ca" },
  { name: "Australia", flag: "🇦🇺", code: "au" },
  { name: "Bangladesh", flag: "🇧🇩", code: "bd" },
  // { name: "Germany", flag: "🇩🇪", code: "de" },
  { name: "India", flag: "🇮🇳", code: "in" },
];

export const PROJECTS = [
  {
    id: "wordgame",
    name: "Word Game",
    subtitle: "Realtime Word Game Platform",
    description:
      "A real-time multiplayer word chain game where two players join the same room and compete by entering English words that begin with the last letter of the previous word. The game automatically validates words using a Dictionary API, enforces turn-based rules, and updates scores in real time for a fair and engaging gameplay experience.",
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
      "A scalable social platform where creators publish stories, build audiences, and engage communities through structured content — built with a focus on performance, real-time interaction, and data integrity.",
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
      "An enterprise-grade AI conversational platform with dual-memory architecture — combining short-term session context with long-term semantic memory for deeply personalized, context-aware interactions.",
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
    usage: "Building component-driven UIs with hooks and state management",
    icon: "⚛️",
  },
  {
    name: "Next.js",
    category: "frontend",
    usage: "Full-stack React apps with SSR, API routes, and app router",
    icon: "▲",
  },
  {
    name: "TypeScript",
    category: "frontend",
    usage: "Strongly typed codebases for safer, more maintainable code",
    icon: "TS",
  },
  {
    name: "JavaScript",
    category: "frontend",
    usage: "Core language for both client and server-side development",
    icon: "JS",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    usage: "Utility-first styling for rapid, consistent UI development",
    icon: "🎨",
  },
  {
    name: "React Query",
    category: "frontend",
    usage: "Server-state management, caching, and async data fetching",
    icon: "RQ",
  },
  {
    name: "Shadcn UI",
    category: "frontend",
    usage: "Accessible component library for production-ready UIs",
    icon: "◻",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    usage: "High-performance server runtime for scalable APIs",
    icon: "🟢",
  },
  {
    name: "Express.js",
    category: "backend",
    usage: "Minimal web framework for building REST APIs",
    icon: "Ex",
  },
  {
    name: "Socket.IO",
    category: "backend",
    usage: "Real-time bidirectional communication for live features",
    icon: "⚡",
  },
  {
    name: "BullMQ",
    category: "backend",
    usage: "Reliable job queues for async background processing",
    icon: "📋",
  },
  {
    name: "GraphQL",
    category: "backend",
    usage: "Flexible query language for data-driven APIs",
    icon: "◉",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    usage: "Relational database with complex query and indexing needs",
    icon: "🐘",
  },
  {
    name: "MongoDB",
    category: "backend",
    usage: "Flexible document store for dynamic, schema-free data",
    icon: "🍃",
  },
  {
    name: "Redis",
    category: "backend",
    usage: "In-memory caching, session store, and pub/sub messaging",
    icon: "🔴",
  },
  {
    name: "Prisma",
    category: "backend",
    usage: "Type-safe ORM for PostgreSQL with migration management",
    icon: "◇",
  },
  {
    name: "Pinecone",
    category: "backend",
    usage: "Vector database for semantic search and RAG systems",
    icon: "🔍",
  },
  {
    name: "OpenAI API",
    category: "backend",
    usage: "LLM integration for AI features, embeddings, and RAG",
    icon: "🤖",
  },

  // Deployment
  {
    name: "AWS EC2",
    category: "deployment",
    usage: "Provisioning and managing production Linux servers",
    icon: "☁️",
  },
  {
    name: "Docker",
    category: "deployment",
    usage: "Containerizing applications for consistent deployments",
    icon: "🐳",
  },
  {
    name: "Nginx",
    category: "deployment",
    usage: "Reverse proxy, load balancing, and SSL termination",
    icon: "⚙️",
  },
  {
    name: "GitHub Actions",
    category: "deployment",
    usage: "Automated CI/CD pipelines for zero-touch deployments",
    icon: "🔄",
  },
  {
    name: "Vercel",
    category: "deployment",
    usage: "Zero-config deployment platform for Next.js projects",
    icon: "▲",
  },
  {
    name: "AWS S3",
    category: "deployment",
    usage:
      "Object storage for media uploads, backups, and static asset delivery via SDK",
    icon: "🪣",
  },
  {
    name: "Linux",
    category: "deployment",
    usage:
      "Server administration, shell scripting, and production environment management",
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
