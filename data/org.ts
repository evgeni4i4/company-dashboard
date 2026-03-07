export interface Department {
  name: string;
  head: string;
  focus: string;
  services: string[];
  skillCount: number;
  color: string;
}

export interface BoardMember {
  name: string;
  domain: string;
  frameworks: string[];
}

export const departments: Department[] = [
  {
    name: "Product",
    head: "prod",
    focus: "Strategy, specs, MVPs, prioritization, competitive intel",
    services: [
      "Specification Architecture",
      "SPARC Methodology",
      "Product Marketing Context",
      "A/B Test Setup",
      "Free Tool Strategy",
      "CEO Council",
      "Competitive Analysis",
      "Feature Prioritization",
      "MVP Scoping",
    ],
    skillCount: 9,
    color: "#6366f1",
  },
  {
    name: "Development",
    head: "dev",
    focus: "Architecture, code, CI/CD, testing, AI agents, infra",
    services: [
      "Pair Programming",
      "Frontend Design",
      "AgentDB Advanced",
      "AgentDB Vector Search",
      "Stream Chain",
      "Swarm Advanced",
      "GitHub Integrations",
      "Verification & Quality",
      "Hooks Automation",
      "Skill Builder",
    ],
    skillCount: 10,
    color: "#10b981",
  },
  {
    name: "Marketing",
    head: "mark",
    focus: "Content, SEO, ads, social, copy, analytics, CRO",
    services: [
      "Blog & Content Strategy",
      "SEO Optimization",
      "Copywriting & Editing",
      "Social Content",
      "X Posts",
      "Ad Creative",
      "Marketing Analytics",
      "Paid Ads",
      "CRO",
      "Launch Strategy",
      "Email Sequences",
    ],
    skillCount: 11,
    color: "#f59e0b",
  },
  {
    name: "Sales",
    head: "sal",
    focus: "Outbound, enablement, pricing, revenue ops",
    services: [
      "Cold Email Campaigns",
      "Sales Enablement",
      "Pricing Strategy",
      "Revenue Operations",
    ],
    skillCount: 4,
    color: "#ef4444",
  },
  {
    name: "HR",
    head: "hr",
    focus: "Hiring, culture, onboarding, performance, org design",
    services: [
      "Recruitment & Hiring",
      "Culture Development",
      "Onboarding Programs",
      "Performance Management",
      "Org Design",
    ],
    skillCount: 0,
    color: "#ec4899",
  },
  {
    name: "Operations",
    head: "ops",
    focus: "Finance, legal, admin, comms, project mgmt",
    services: [
      "Finance",
      "Legal",
      "Communications",
      "Executive Secretary",
    ],
    skillCount: 4,
    color: "#8b5cf6",
  },
  {
    name: "Customer Success",
    head: "cs",
    focus: "Onboarding, retention, churn, referrals, lifecycle",
    services: [
      "Churn Prevention",
      "Onboarding CRO",
      "Referral Program",
      "Email Sequences",
      "Lifecycle Management",
    ],
    skillCount: 4,
    color: "#06b6d4",
  },
];

export const boardMembers: BoardMember[] = [
  {
    name: "Elon Musk",
    domain: "First Principles / Rapid Execution",
    frameworks: ["First-principles reasoning", "10x ambition", "Rapid iteration"],
  },
  {
    name: "Jeff Bezos",
    domain: "Customer Obsession / Operations",
    frameworks: ["Working backwards", "Day 1 mentality", "Operational excellence"],
  },
  {
    name: "Naval Ravikant",
    domain: "Leverage / Wealth Creation",
    frameworks: ["Leverage (code, media, capital, labor)", "Specific knowledge"],
  },
  {
    name: "Paul Graham",
    domain: "Startups / Product-Market Fit",
    frameworks: ["Do things that don't scale", "Maker's schedule", "Taste"],
  },
  {
    name: "Peter Thiel",
    domain: "Contrarian Strategy / Monopoly",
    frameworks: ["Zero to One", "Avoid competition", "Definite optimism"],
  },
  {
    name: "Charlie Munger",
    domain: "Mental Models / Multidisciplinary",
    frameworks: ["Latticework of mental models", "Inversion", "Avoiding stupidity"],
  },
  {
    name: "Marc Andreessen",
    domain: "Tech Trends / Platforms",
    frameworks: ["Software eating the world", "Network effects", "Platforms"],
  },
  {
    name: "Seth Godin",
    domain: "Marketing / Brand / Tribes",
    frameworks: ["Permission marketing", "Purple cow", "Tribes & storytelling"],
  },
  {
    name: "Daniel Kahneman",
    domain: "Decisions / Behavioral Science",
    frameworks: ["System 1/2 thinking", "Cognitive biases", "Pre-mortem"],
  },
  {
    name: "Ben Horowitz",
    domain: "Leadership / Hard Decisions",
    frameworks: ["Wartime vs peacetime CEO", "Management debt"],
  },
  {
    name: "Ray Dalio",
    domain: "Finance / Systematic Decisions",
    frameworks: ["Principles", "Radical transparency", "Idea meritocracy"],
  },
  {
    name: "Steve Jobs",
    domain: "Design Taste / Product Vision",
    frameworks: ["Simplicity", "Saying no to 1,000 things"],
  },
  {
    name: "Linus Torvalds",
    domain: "Engineering / Pragmatism",
    frameworks: ["Show me the code", "Anti-overengineering", "Correctness"],
  },
  {
    name: "Marc Benioff",
    domain: "Enterprise Sales / GTM",
    frameworks: ["V2MOM", "Land-and-expand", "SaaS sales playbook"],
  },
];
