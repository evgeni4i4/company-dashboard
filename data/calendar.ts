export type Platform =
  | "linkedin"
  | "linkedin-ivinco"
  | "x"
  | "blog"
  | "instagram"
  | "facebook";

export type ItemStatus = "ready" | "draft" | "todo" | "published";

export interface CalendarItem {
  platform: Platform;
  title: string;
  details: string;
  status: ItemStatus;
  framework?: string;
}

export interface CalendarDay {
  date: string;
  items: CalendarItem[];
}

export interface CalendarWeek {
  label: string;
  days: CalendarDay[];
}

export const platformConfig: Record<
  Platform,
  { label: string; color: string; shortLabel: string }
> = {
  linkedin: {
    label: "LinkedIn (Eugene)",
    shortLabel: "LI",
    color: "#0a66c2",
  },
  "linkedin-ivinco": {
    label: "LinkedIn (Ivinco)",
    shortLabel: "LI Co",
    color: "#0a66c2",
  },
  x: { label: "X (@lvtn)", shortLabel: "X", color: "#000000" },
  blog: { label: "Blog", shortLabel: "Blog", color: "#10b981" },
  instagram: { label: "Instagram", shortLabel: "IG", color: "#e1306c" },
  facebook: { label: "Facebook", shortLabel: "FB", color: "#1877f2" },
};

export const statusConfig: Record<
  ItemStatus,
  { label: string; color: string }
> = {
  published: { label: "Published", color: "#10b981" },
  ready: { label: "Ready", color: "#6366f1" },
  draft: { label: "Draft", color: "#f59e0b" },
  todo: { label: "To Do", color: "#9ca3af" },
};

export const sprintTitle = "Content Sprint: March 9\u201320, 2026";

export const calendar: CalendarWeek[] = [
  {
    label: "Week 1: March 9\u201313",
    days: [
      {
        date: "2026-03-09",
        items: [
          {
            platform: "linkedin",
            title: 'Amazon Already Made Its Move',
            details: "Post 5 — Amazon's walled garden strategy, Buy for Me, protocol refusal",
            status: "ready",
            framework: "PAS",
          },
          {
            platform: "x",
            title: "Amazon scraping angle",
            details:
              "\"Amazon's 'Buy for Me' scraped 500K+ products from indie stores. The opt-out is an email address.\"",
            status: "todo",
            framework: "Compressed PAS",
          },
        ],
      },
      {
        date: "2026-03-10",
        items: [
          {
            platform: "blog",
            title: "The Agentic Commerce Infrastructure Gap",
            details: "Deploy Blog Post 2 via publish-blog.sh",
            status: "ready",
          },
          {
            platform: "linkedin-ivinco",
            title: "Share: Infrastructure Gap",
            details:
              "Company-voice summary linking to blog post. Include hero image.",
            status: "ready",
          },
          {
            platform: "x",
            title: "Personal/range tweet",
            details:
              "Immigration or fatherhood from topic bank",
            status: "todo",
            framework: "Setup-Punchline",
          },
        ],
      },
      {
        date: "2026-03-11",
        items: [
          {
            platform: "linkedin",
            title: "OpenAI ACP Pullback",
            details:
              "News Take — Instant Checkout deprioritized after 3 weeks. Digital Commerce 360 source.",
            status: "draft",
            framework: "STF",
          },
          {
            platform: "x",
            title: "OpenAI pullback angle",
            details:
              "\"OpenAI's Instant Checkout lasted 3 weeks. Selling things is harder than recommending them.\"",
            status: "todo",
            framework: "Setup-Punchline",
          },
        ],
      },
      {
        date: "2026-03-12",
        items: [
          {
            platform: "blog",
            title: "China Is Already Living in the Agentic Commerce Future",
            details: "Deploy Blog Post 3 via publish-blog.sh",
            status: "ready",
          },
          {
            platform: "linkedin-ivinco",
            title: "Share: China Agentic Commerce",
            details:
              "Company-voice summary — Alipay 120M transactions, integrated platforms vs. protocols.",
            status: "ready",
          },
          {
            platform: "x",
            title: "Language/identity tweet",
            details:
              "\"English has 'I miss you.' Russian has 6 different verbs for missing.\"",
            status: "todo",
            framework: "Tension-Release",
          },
        ],
      },
      {
        date: "2026-03-13",
        items: [
          {
            platform: "linkedin",
            title: "B2B Is the Real Agentic Commerce Story",
            details:
              "Post 8 — B2B commerce bigger and more broken than consumer. Needs critics run.",
            status: "draft",
            framework: "VSQ",
          },
          {
            platform: "x",
            title: "Range tweet",
            details: "Movies, cars, sports — light take",
            status: "todo",
          },
          {
            platform: "instagram",
            title: "\u0417\u0430\u043f\u0430\u0445 \u0431\u043e\u0440\u0449\u0430 \u0432 \u0447\u0443\u0436\u043e\u043c \u043f\u043e\u0434\u044a\u0435\u0437\u0434\u0435",
            details:
              "First Russian post \u2014 break the ice. IG carousel, 3\u20135 slides.",
            status: "todo",
            framework: "The Scene",
          },
        ],
      },
    ],
  },
  {
    label: "Week 2: March 16\u201320",
    days: [
      {
        date: "2026-03-16",
        items: [
          {
            platform: "linkedin",
            title: "Discovery from research briefs",
            details:
              "Mine product categories analysis or ChatGPT 4% checkout fee research.",
            status: "todo",
            framework: "PAS or AIDA",
          },
          {
            platform: "x",
            title: "Agentic commerce take",
            details: "Compressed version of the LinkedIn discovery angle",
            status: "todo",
            framework: "Compressed PAS",
          },
        ],
      },
      {
        date: "2026-03-17",
        items: [
          {
            platform: "linkedin-ivinco",
            title: "UCP integration learnings",
            details:
              "\"What we're learning building agentic commerce tools for WooCommerce merchants\"",
            status: "todo",
          },
          {
            platform: "x",
            title: "Personal tweet",
            details: "Fatherhood moment or immigration observation",
            status: "todo",
            framework: "Micro-Story",
          },
        ],
      },
      {
        date: "2026-03-18",
        items: [
          {
            platform: "linkedin",
            title: "Reactive news take",
            details:
              "Slot open for breaking agentic commerce news. Backup: contrarian from research.",
            status: "todo",
            framework: "VSQ or HSO",
          },
          {
            platform: "x",
            title: "Observation",
            details: "Follow-up on the news take, compressed for X",
            status: "todo",
            framework: "Tension-Release",
          },
          {
            platform: "facebook",
            title: "\u0421\u044b\u043d \u0441\u043f\u0440\u043e\u0441\u0438\u043b \u00ab\u043f\u0430\u043f\u0430, \u0442\u044b \u043e\u0442\u043a\u0443\u0434\u0430?\u00bb",
            details:
              "First Russian essay. FB essay format (600\u20132000 words). No hashtags.",
            status: "todo",
            framework: "Question-Without-Answer",
          },
        ],
      },
      {
        date: "2026-03-19",
        items: [
          {
            platform: "linkedin-ivinco",
            title: "Share blog post or news perspective",
            details:
              "If Blog Post 4 ready: share. Otherwise: react to week's biggest development.",
            status: "todo",
          },
          {
            platform: "blog",
            title: "Start: Amazon's Walled Garden Strategy",
            details:
              "Blog Post 4 \u2014 expand LinkedIn Post 5 to Deep Dive (2,000\u20133,000 words).",
            status: "todo",
          },
          {
            platform: "x",
            title: "Personal tweet",
            details: "Language/translation or random observation",
            status: "todo",
            framework: "The Inversion",
          },
        ],
      },
      {
        date: "2026-03-20",
        items: [
          {
            platform: "linkedin",
            title: "Discovery or Contrarian",
            details:
              "From research briefs \u2014 HN debates, Reddit angles, or fresh contrarian takes.",
            status: "todo",
            framework: "BAB or SLAY",
          },
          {
            platform: "x",
            title: "Week-end observation",
            details: "Light take \u2014 movies, cars, something personal",
            status: "todo",
          },
          {
            platform: "instagram",
            title: "Second Russian post (optional)",
            details:
              "If inspiration hits \u2014 \"\u041c\u043e\u0438 \u0434\u0435\u0442\u0438 \u043d\u0438\u043a\u043e\u0433\u0434\u0430 \u043d\u0435 \u0443\u0437\u043d\u0430\u044e\u0442...\" or \"\u0421\u0443\u0431\u0431\u043e\u0442\u0430, \u0443\u0442\u0440\u043e, \u043a\u0443\u0445\u043d\u044f...\"",
            status: "todo",
            framework: "\u0422\u043e\u0441\u043a\u0430-to-Reframe",
          },
        ],
      },
    ],
  },
];
