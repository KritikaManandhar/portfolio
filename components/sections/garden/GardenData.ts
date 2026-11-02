/**
 * Data models and verified content for "The Secret Garden of My Skills"
 * All skills, projects, and learning journey items are sourced from actual portfolio data.
 */

export interface SkillPlant {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "databases" | "tools";
  categoryLabel: string;
  botanicalGenus: string;
  description: string;
  practiceNotes: string;
  relatedProject?: string;
  status: "Core Craft" | "Actively Building" | "Academic Foundation";
  accentColor: string;
  iconType: string;
  docUrl?: string;
}

export interface LearningChapter {
  id: string;
  tomeTitle: string;
  chapterNumber: string;
  era: string;
  focus: string;
  summary: string;
  keyTakeaways: string[];
  quote: string;
}

export interface GardenProject {
  id: string;
  title: string;
  chapterNumber: string;
  badgeLabel: string;
  subtitle: string;
  description: string;
  purpose: string;
  tags: string[];
  githubUrl: string;
  highlights: string[];
  iconType: string;
  accentColor: string;
}

export interface GardenBadge {
  id: string;
  name: string;
  description: string;
  hint: string;
  icon: string;
  earnedTitle: string;
}

export interface PondEasterEgg {
  id: string;
  name: string;
  icon: string;
  title: string;
  message: string;
  discoveryNote: string;
}

// 1. VERIFIED SKILLS CATALOG FOR THE GREENHOUSE
export const SKILL_PLANTS: SkillPlant[] = [
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "languages",
    categoryLabel: "Programming Languages",
    botanicalGenus: "Scripta Dynamica",
    description: "Modern ECMAScript standard with asynchronous promises, event loops, functional closures, and dynamic DOM manipulation.",
    practiceNotes: "Core logic engine powering interactive frontend web apps, animations, and cart state engines.",
    relatedProject: "E-Commerce Website & Room Rental",
    status: "Core Craft",
    accentColor: "#E4BA68",
    iconType: "code",
    docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    categoryLabel: "Programming Languages",
    botanicalGenus: "Typus Rigidus",
    description: "Strictly typed superset of JavaScript providing interface contracts, compile-time safety, generics, and architectural reliability.",
    practiceNotes: "Used for robust component props, Prisma ORM entity typing, and server request contracts in full-stack apps.",
    relatedProject: "Room Rental Management System",
    status: "Core Craft",
    accentColor: "#4B82AF",
    iconType: "code",
    docUrl: "https://www.typescriptlang.org/",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    categoryLabel: "Backend & Server Architecture",
    botanicalGenus: "Hypertextus Serveris",
    description: "Server-side scripting language handling relational database persistence, HTTP request routing, session lifecycles, and backend forms.",
    practiceNotes: "Built robust authentication middleware, session persistence, and dynamic e-commerce catalogs with MySQL.",
    relatedProject: "E-Commerce & Student Registration Portal",
    status: "Core Craft",
    accentColor: "#7B68EE",
    iconType: "server",
    docUrl: "https://www.php.net/",
  },
  {
    id: "c-cpp",
    name: "C & C++",
    category: "languages",
    categoryLabel: "Programming Languages",
    botanicalGenus: "Structura Memoriae",
    description: "Low-level and object-oriented systems languages covering pointer arithmetic, memory management, and algorithmic complexity.",
    practiceNotes: "Rigorous coursework at Padmakanya Campus covering OOP polymorphism, inheritance, and foundational data structures.",
    status: "Academic Foundation",
    accentColor: "#5C768D",
    iconType: "cpu",
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    categoryLabel: "Programming Languages",
    botanicalGenus: "Robusta Modularis",
    description: "Enterprise class architecture, strict static typing, class encapsulation, and JVM modular compilation.",
    practiceNotes: "CSIT laboratory software engineering exercises with clean OOP patterns and interface abstractions.",
    status: "Academic Foundation",
    accentColor: "#D0684D",
    iconType: "coffee",
  },
  {
    id: "react",
    name: "React 19 & Next.js",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    botanicalGenus: "Reactivus Flos",
    description: "Component-driven declarative user interfaces, custom React hooks, virtual DOM reconciler, and server/client boundaries.",
    practiceNotes: "Created dynamic multi-screen portfolio workflows, interactive canvases, and reactive web applications.",
    relatedProject: "Room Rental Management System",
    status: "Core Craft",
    accentColor: "#4A9E86",
    iconType: "layout",
    docUrl: "https://react.dev/",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS & CSS3",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    botanicalGenus: "Stilus Venustus",
    description: "Utility-first design tokens, responsive Flexbox/Grid systems, GPU-accelerated keyframe animations, and custom aesthetic themes.",
    practiceNotes: "Authored storybook parchment themes, fluid responsive layouts, and rich hand-crafted visual textures.",
    status: "Core Craft",
    accentColor: "#38BDF8",
    iconType: "palette",
    docUrl: "https://tailwindcss.com/",
  },
  {
    id: "nodejs-express",
    name: "Node.js & Express",
    category: "backend",
    categoryLabel: "Backend & Server Architecture",
    botanicalGenus: "Servientis Radix",
    description: "Event-driven asynchronous server runtime with Express middleware routing, JWT authentication, and Zod validation.",
    practiceNotes: "Designed RESTful API endpoints for property management, user onboarding, and tenancy verification.",
    relatedProject: "Room Rental Management System",
    status: "Core Craft",
    accentColor: "#539E43",
    iconType: "server",
    docUrl: "https://nodejs.org/",
  },
  {
    id: "mysql-postgres",
    name: "MySQL & PostgreSQL",
    category: "databases",
    categoryLabel: "Databases & Schemas",
    botanicalGenus: "Relatio Stabilis",
    description: "ACID-compliant relational database management engines featuring normalized schemas, foreign keys, and indexed queries.",
    practiceNotes: "Modeled complex relational structures for retail order tables, room bookings, invoices, and user identity tables.",
    relatedProject: "E-Commerce & Room Rental System",
    status: "Core Craft",
    accentColor: "#336791",
    iconType: "database",
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "databases",
    categoryLabel: "Databases & Schemas",
    botanicalGenus: "Ormus Typatus",
    description: "Next-generation type-safe database client and declarative schema modeling with automated migrations and relations.",
    practiceNotes: "Authored comprehensive multi-table schema for properties, amenities, real-time messages, and invoices.",
    relatedProject: "Room Rental Management System",
    status: "Actively Building",
    accentColor: "#2D3748",
    iconType: "database",
    docUrl: "https://www.prisma.io/",
  },
  {
    id: "socketio",
    name: "Socket.io",
    category: "backend",
    categoryLabel: "Backend & Server Architecture",
    botanicalGenus: "Undae Simultaneae",
    description: "Full-duplex WebSocket communication enabling instantaneous event broadcasting, presence tracking, and real-time messaging.",
    practiceNotes: "Implemented two-way tenant-landlord direct chat with message receipts and typing events.",
    relatedProject: "Room Rental Management System",
    status: "Actively Building",
    accentColor: "#010101",
    iconType: "zap",
  },
  {
    id: "figma",
    name: "Figma & UI/UX Design",
    category: "tools",
    categoryLabel: "Design & Prototyping",
    botanicalGenus: "Designa Prototypica",
    description: "Interactive component prototyping, layout grids, typography scales, design systems, and user journey mapping.",
    practiceNotes: "Accredited Web Design Diploma training at Broadway Infosys Nepal; high-fidelity web prototyping.",
    status: "Core Craft",
    accentColor: "#F24E1E",
    iconType: "figma",
  },
];

// 2. VERIFIED LEARNING JOURNEY FOR THE LITTLE LIBRARY
export const LEARNING_CHAPTERS: LearningChapter[] = [
  {
    id: "foundations",
    chapterNumber: "Folio I",
    tomeTitle: "The Academic Roots",
    era: "2022 – 2026 • Padmakanya Multiple Campus, TU",
    focus: "B.Sc. Computer Science & Information Technology",
    summary: "Embarking on the formal discipline of computing: low-level C programming, memory pointers, mathematical algorithms, relational database theory, and object-oriented design in C++ and Java.",
    keyTakeaways: [
      "Rigorous algorithm analysis, Big-O complexity, and pointer arithmetic in C.",
      "Object-oriented design patterns, encapsulation, and class inheritance.",
      "Relational algebra, SQL normalization, and database transaction integrity.",
    ],
    quote: "A strong tree requires deep roots; foundational computer science grounds every aesthetic line of frontend code.",
  },
  {
    id: "artisan-web",
    chapterNumber: "Folio II",
    tomeTitle: "The Web Artisan's Apprenticeship",
    era: "Professional Accredited Diploma • Broadway Infosys Nepal",
    focus: "Modern Web Design & Frontend Engineering",
    summary: "Bridging the gap between code logic and human empathy: mastering semantic HTML5 page anatomy, CSS3 layout engines, Figma wireframing, UX heuristics, and interactive JavaScript interfaces.",
    keyTakeaways: [
      "Designing responsive, fluid layouts across mobile, tablet, and desktop viewports.",
      "Figma component systems, visual design harmony, and accessibility standards.",
      "Interactive DOM event loops, asynchronous API handling, and animation choreography.",
    ],
    quote: "Web design is not merely decoration—it is the welcoming bridge between human curiosity and computing power.",
  },
  {
    id: "fullstack-crucible",
    chapterNumber: "Folio III",
    tomeTitle: "The Full-Stack Crucible",
    era: "Hands-on Project Architecture",
    focus: "Full-Stack Web Engineering & Database Persistence",
    summary: "Building complete production-grade web platforms from the ground up: relational database schemas, secure authentication pipelines, real-time WebSocket communication, and responsive modern user interfaces.",
    keyTakeaways: [
      "Engineered an E-Commerce storefront with relational cart management and SQL injection defenses.",
      "Constructed a secure student portal with defensive session routing and sanitization.",
      "Built a modern Room Rental marketplace combining React 19, Leaflet maps, Prisma ORM, and Socket.io.",
    ],
    quote: "True learning happens when theoretical concepts meet real database migrations and real user interactions.",
  },
  {
    id: "horizon",
    chapterNumber: "Folio IV",
    tomeTitle: "The Horizon Ahead",
    era: "Continuous Cultivation",
    focus: "Next.js App Router, Distributed Systems & Mindful UX",
    summary: "Constantly pruning and expanding the garden: diving deeper into Next.js 16 App Router server actions, micro-animations, type-safe full-stack architectures, and cozy storytelling interfaces that delight users.",
    keyTakeaways: [
      "Advancing full-stack TypeScript mastery across server and client boundaries.",
      "Exploring Web Audio API synthesis and tactile micro-interactions for web portfolios.",
      "Pursuing collaborative software engineering opportunities with passionate dev teams.",
    ],
    quote: "The best gardens are never truly finished—there is always new soil to till and new seeds to nurture.",
  },
];

// 3. VERIFIED PROJECTS FOR THE ARTISAN WORKSHOP
export const GARDEN_PROJECTS: GardenProject[] = [
  {
    id: "ecommerce",
    chapterNumber: "01",
    badgeLabel: "Retail Architecture",
    title: "E-Commerce Website & Inventory Platform",
    subtitle: "Dynamic Storefront, Session Cart Engine & Relational Catalog",
    description: "A complete online retail web application featuring real-time product discovery, interactive shopping cart management, persistent user wishlist, and secure session authentication integrated with a relational MySQL database.",
    purpose: "Engineered to deliver seamless online shopping flows while implementing defensive server-side programming and relational data integrity.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/KritikaManandhar/E-commerce-website",
    highlights: [
      "Relational product categorization with dynamic category & price filtering.",
      "Session-based cart persistence and real-time subtotal calculations.",
      "Password hashing and SQL injection mitigation on user authentication routes.",
      "Responsive storefront grid styled for mobile & desktop screens.",
    ],
    iconType: "shopping-bag",
    accentColor: "#D0684D",
  },
  {
    id: "auth-system",
    chapterNumber: "02",
    badgeLabel: "Security & Portal",
    title: "Student Registration & Login System",
    subtitle: "Secure Input Sanitization, Session Cookies & Error Handling",
    description: "A structured student onboarding form and authentication portal featuring comprehensive client/server-side validation, error handling, session cookies, and clean responsive layout design for optimized usability.",
    purpose: "Built as a focused web security practicum at Padmakanya Campus to master defensive authentication flows and form sanitization.",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "Session Auth"],
    githubUrl: "https://github.com/KritikaManandhar/Website",
    highlights: [
      "Rigorous form input sanitization and regex pattern validation checks.",
      "Clear feedback alerts for existing user collision and credential errors.",
      "Session lifecycle management with secure logout redirection.",
      "Semantic HTML forms designed with accessibility best practices.",
    ],
    iconType: "lock",
    accentColor: "#6B8A68",
  },
  {
    id: "room-rental",
    chapterNumber: "03",
    badgeLabel: "Tenancy & Spatial Ecosystem",
    title: "Room Rental Management System",
    subtitle: "Full-Stack Property Discovery, Interactive Map Pinning & Tenancy Pipeline",
    description: "A comprehensive rental management ecosystem connecting tenants and landlords with Leaflet interactive map discovery, real-time Socket.io chat, digital rent invoicing (eSewa & Khalti), and Prisma relational PostgreSQL schema modeling.",
    purpose: "Solves the fragmented rental housing search in Nepal by providing verified landlord listings, spatial map coordinates, direct messaging, and digital rent receipts.",
    tags: ["React 19", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "Leaflet", "Socket.io", "Tailwind CSS"],
    githubUrl: "https://github.com/Jyotikunwar/Room-Rental-management-system",
    highlights: [
      "Multi-role RBAC architecture (Tenant, Landlord, Admin) with government identification document verification.",
      "Interactive spatial discovery with Leaflet & React-Leaflet geocoordinates, city filtering, and amenity checklists.",
      "Real-time tenant-landlord communication powered by Socket.io with attachments and read receipts.",
      "Automated rent invoicing, security deposit tracking, and eSewa / Khalti payment gateway workflows.",
      "Smart recommendation engine with similarity and popularity scoring, plus maintenance complaint tracking.",
    ],
    iconType: "home",
    accentColor: "#3E6B89",
  },
];

// 4. BADGES FOR THE GARDEN LOGBOOK
export const GARDEN_BADGES: GardenBadge[] = [
  {
    id: "badge-explorer",
    name: "Garden Explorer",
    description: "Wandered along the stepping stone paths and visited all 5 garden destinations.",
    hint: "Visit the Greenhouse, Library, Workshop, Mailbox, and Pond.",
    icon: "compass",
    earnedTitle: "Master Wanderer",
  },
  {
    id: "badge-botanist",
    name: "Curious Botanist",
    description: "Inspected at least 4 different botanical skill plants in the Greenhouse.",
    hint: "Click on 4 different plants inside the Greenhouse.",
    icon: "sprout",
    earnedTitle: "Guild Herbalist",
  },
  {
    id: "badge-inventor",
    name: "Little Inventor",
    description: "Explored the blueprints and architecture notes inside the Workshop.",
    hint: "Inspect a project inside the Workshop.",
    icon: "hammer",
    earnedTitle: "Master Craftsman",
  },
  {
    id: "badge-secret",
    name: "Secret Finder",
    description: "Uncovered the glowing mushroom or whispered familiar at the Hidden Pond.",
    hint: "Search around the secluded waters of the pond.",
    icon: "sparkles",
    earnedTitle: "Keeper of Secrets",
  },
  {
    id: "badge-messenger",
    name: "Sunset Messenger",
    description: "Opened the wooden postbox to review developer contact coordinates.",
    hint: "Check the mailbox near the garden entrance.",
    icon: "mail",
    earnedTitle: "Garden Dispatcher",
  },
];

// 5. EASTER EGGS FOR THE HIDDEN POND
export const POND_EASTER_EGGS: PondEasterEgg[] = [
  {
    id: "glowing-mushroom",
    name: "Bioluminescent Forest Fungi",
    icon: "mushroom",
    title: "A Soft Emerald Glow in the Reeds",
    message: "You discovered a cluster of rare glowing mushrooms thriving near the damp moss. Legend says they bloom when clean code passes all unit tests.",
    discoveryNote: "✦ Discovery Recorded: The spore glow illuminated your Garden Logbook.",
  },
  {
    id: "familiar-sprite",
    name: "The Calico Garden Familiar",
    icon: "cat",
    title: "A Sleepy Calico Sprite Napping by the Water",
    message: "A tiny familiar is curled up on a warm sunlit stone beside the water lilies. When you step closer, it purrs softly with a rhythmic breathing animation and opens one curious eye.",
    discoveryNote: "✦ Discovery Recorded: The familiar offered you peaceful coding luck.",
  },
  {
    id: "secret-note",
    name: "Whispered Leaf Parchment",
    icon: "scroll",
    title: "A Note Tucked Under a River Pebble",
    message: "“Thank you for wandering into my secret garden. Every line of code, animation keyframe, and botanical illustration in this portfolio was grown with mindful care, tea, and curiosity.” — Kritika Manandhar",
    discoveryNote: "✦ Discovery Recorded: An artisan developer blessing added to your journey.",
  },
];
