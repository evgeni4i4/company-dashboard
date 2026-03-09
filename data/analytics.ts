import { Platform, platformConfig } from "./calendar";

export interface PostPerformance {
  id: string;
  platform: Platform;
  title: string;
  publishedDate: string;
  framework?: string;
  topic?: string;
  metrics: {
    impressions?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    clicks?: number;
    saves?: number;
    pageviews?: number;
    avgTimeOnPage?: number;
  };
  engagementRate?: number;
}

export interface SprintSummary {
  label: string;
  startDate: string;
  endDate: string;
  planned: number;
  published: number;
  totalImpressions: number;
  totalEngagement: number;
  avgEngagementRate: number;
}

export interface FrameworkStats {
  framework: string;
  count: number;
  avgEngagementRate: number;
  totalImpressions: number;
  totalEngagement: number;
}

export interface PlatformSummary {
  platform: Platform;
  postCount: number;
  avgImpressions: number;
  avgEngagementRate: number;
  totalReach: number;
  totalEngagement: number;
}

export interface Recommendation {
  type: "positive" | "negative" | "neutral";
  text: string;
  metric?: string;
}

// --- Helper functions ---

export function computeEngagementRate(metrics: PostPerformance["metrics"]): number {
  const impressions = metrics.impressions || 0;
  if (impressions === 0) return 0;
  const engagement = (metrics.likes || 0) + (metrics.comments || 0) + (metrics.shares || 0);
  return engagement / impressions;
}

export function computeSprintSummary(
  posts: PostPerformance[],
  planned: number,
  label: string,
  startDate: string,
  endDate: string
): SprintSummary {
  const totalImpressions = posts.reduce((s, p) => s + (p.metrics.impressions || 0), 0);
  const totalEngagement = posts.reduce(
    (s, p) => s + (p.metrics.likes || 0) + (p.metrics.comments || 0) + (p.metrics.shares || 0),
    0
  );
  const rates = posts.map((p) => p.engagementRate || 0).filter((r) => r > 0);
  const avgEngagementRate = rates.length > 0 ? rates.reduce((s, r) => s + r, 0) / rates.length : 0;

  return {
    label,
    startDate,
    endDate,
    planned,
    published: posts.length,
    totalImpressions,
    totalEngagement,
    avgEngagementRate,
  };
}

export function computeFrameworkStats(posts: PostPerformance[]): FrameworkStats[] {
  const byFramework: Record<string, PostPerformance[]> = {};
  for (const post of posts) {
    if (!post.framework) continue;
    const key = post.framework;
    if (!byFramework[key]) byFramework[key] = [];
    byFramework[key].push(post);
  }

  return Object.entries(byFramework)
    .map(([framework, fPosts]) => {
      const totalImpressions = fPosts.reduce((s, p) => s + (p.metrics.impressions || 0), 0);
      const totalEngagement = fPosts.reduce(
        (s, p) => s + (p.metrics.likes || 0) + (p.metrics.comments || 0) + (p.metrics.shares || 0),
        0
      );
      const rates = fPosts.map((p) => p.engagementRate || 0).filter((r) => r > 0);
      const avgEngagementRate = rates.length > 0 ? rates.reduce((s, r) => s + r, 0) / rates.length : 0;

      return { framework, count: fPosts.length, avgEngagementRate, totalImpressions, totalEngagement };
    })
    .sort((a, b) => b.avgEngagementRate - a.avgEngagementRate);
}

export function computePlatformSummary(posts: PostPerformance[]): PlatformSummary[] {
  const byPlatform: Record<string, PostPerformance[]> = {};
  for (const post of posts) {
    if (!byPlatform[post.platform]) byPlatform[post.platform] = [];
    byPlatform[post.platform].push(post);
  }

  return Object.entries(byPlatform)
    .map(([platform, pPosts]) => {
      const totalReach = pPosts.reduce((s, p) => s + (p.metrics.impressions || 0), 0);
      const totalEngagement = pPosts.reduce(
        (s, p) => s + (p.metrics.likes || 0) + (p.metrics.comments || 0) + (p.metrics.shares || 0),
        0
      );
      const rates = pPosts.map((p) => p.engagementRate || 0).filter((r) => r > 0);
      const avgEngagementRate = rates.length > 0 ? rates.reduce((s, r) => s + r, 0) / rates.length : 0;
      const avgImpressions = totalReach / pPosts.length;

      return {
        platform: platform as Platform,
        postCount: pPosts.length,
        avgImpressions: Math.round(avgImpressions),
        avgEngagementRate,
        totalReach,
        totalEngagement,
      };
    })
    .sort((a, b) => b.totalReach - a.totalReach);
}

export function generateRecommendations(
  posts: PostPerformance[],
  frameworkStats: FrameworkStats[],
  platformSummary: PlatformSummary[]
): Recommendation[] {
  const recs: Recommendation[] = [];

  // Framework comparison
  if (frameworkStats.length >= 2) {
    const best = frameworkStats[0];
    const worst = frameworkStats[frameworkStats.length - 1];
    if (best.avgEngagementRate > worst.avgEngagementRate * 1.3) {
      recs.push({
        type: "positive",
        text: `${best.framework} averaged ${(best.avgEngagementRate * 100).toFixed(1)}% engagement vs. ${(worst.avgEngagementRate * 100).toFixed(1)}% for ${worst.framework} — lean into ${best.framework} more`,
        metric: "framework",
      });
    }
  }

  // Platform comparison
  if (platformSummary.length >= 2) {
    const topPlatform = platformSummary.sort((a, b) => b.avgEngagementRate - a.avgEngagementRate)[0];
    recs.push({
      type: "positive",
      text: `${platformConfig[topPlatform.platform].label} has the highest engagement rate at ${(topPlatform.avgEngagementRate * 100).toFixed(1)}% — ${topPlatform.postCount} posts published`,
      metric: "platform",
    });
  }

  // Blog + company page synergy
  const blogPosts = posts.filter((p) => p.platform === "blog");
  const companyPosts = posts.filter((p) => p.platform === "linkedin-ivinco");
  if (blogPosts.length > 0 && companyPosts.length > 0) {
    recs.push({
      type: "neutral",
      text: `Blog posts drive ${blogPosts.reduce((s, p) => s + (p.metrics.pageviews || 0), 0).toLocaleString()} pageviews — share every blog post on Ivinco LinkedIn same day for maximum reach`,
      metric: "synergy",
    });
  }

  // Personal vs agentic commerce on X
  const xPosts = posts.filter((p) => p.platform === "x");
  const personalX = xPosts.filter((p) => p.topic === "personal");
  const agenticX = xPosts.filter((p) => p.topic === "agentic-commerce");
  if (personalX.length > 0 && agenticX.length > 0) {
    const personalRate = personalX.reduce((s, p) => s + (p.engagementRate || 0), 0) / personalX.length;
    const agenticRate = agenticX.reduce((s, p) => s + (p.engagementRate || 0), 0) / agenticX.length;
    if (personalRate > agenticRate * 1.2) {
      const pct = Math.round(((personalRate - agenticRate) / agenticRate) * 100);
      recs.push({
        type: "positive",
        text: `Personal X tweets outperform agentic commerce takes by ${pct}% — the audience responds to range`,
        metric: "topic",
      });
    }
  }

  // Day-of-week analysis
  const byDay: Record<string, number[]> = {};
  for (const post of posts) {
    const dayName = new Date(post.publishedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" });
    if (!byDay[dayName]) byDay[dayName] = [];
    if (post.metrics.impressions) byDay[dayName].push(post.metrics.impressions);
  }
  const dayEntries = Object.entries(byDay).filter(([, imps]) => imps.length > 0);
  if (dayEntries.length >= 2) {
    const dayAvgs = dayEntries.map(([day, imps]) => ({
      day,
      avg: imps.reduce((s, i) => s + i, 0) / imps.length,
    }));
    dayAvgs.sort((a, b) => b.avg - a.avg);
    const best = dayAvgs[0];
    const worst = dayAvgs[dayAvgs.length - 1];
    if (best.avg > worst.avg * 1.15) {
      const pct = Math.round(((best.avg - worst.avg) / worst.avg) * 100);
      recs.push({
        type: "neutral",
        text: `${best.day} posts get ${pct}% more impressions than ${worst.day} posts — consider scheduling key posts earlier in the week`,
        metric: "timing",
      });
    }
  }

  // Untested frameworks
  const testedFrameworks = new Set(posts.filter((p) => p.framework).map((p) => p.framework));
  const allFrameworks = ["PAS", "STF", "VSQ", "AIDA", "BAB", "SLAY", "HSO", "Compressed PAS", "Setup-Punchline", "Tension-Release", "The Inversion"];
  const untested = allFrameworks.filter((f) => !testedFrameworks.has(f));
  if (untested.length > 0 && untested.length < allFrameworks.length) {
    recs.push({
      type: "negative",
      text: `Untested frameworks this sprint: ${untested.slice(0, 3).join(", ")}${untested.length > 3 ? ` (+${untested.length - 3} more)` : ""} — try one next sprint for comparison data`,
      metric: "coverage",
    });
  }

  return recs;
}

// --- Sample data (Sprint 1: March 9–20, 2026) ---

export const sprintAnalytics: PostPerformance[] = [
  {
    id: "sprint1-li-1",
    platform: "linkedin",
    title: "Amazon Already Made Its Move",
    publishedDate: "2026-03-09",
    framework: "PAS",
    topic: "agentic-commerce",
    metrics: {
      impressions: 4820,
      likes: 127,
      comments: 34,
      shares: 18,
      clicks: 89,
    },
    engagementRate: 0.0371,
  },
  {
    id: "sprint1-x-1",
    platform: "x",
    title: "Amazon scraping angle",
    publishedDate: "2026-03-09",
    framework: "Compressed PAS",
    topic: "agentic-commerce",
    metrics: {
      impressions: 12400,
      likes: 83,
      comments: 12,
      shares: 31,
      saves: 14,
    },
    engagementRate: 0.0102,
  },
  {
    id: "sprint1-blog-1",
    platform: "blog",
    title: "The Agentic Commerce Infrastructure Gap",
    publishedDate: "2026-03-10",
    topic: "agentic-commerce",
    metrics: {
      pageviews: 1240,
      impressions: 1240,
      avgTimeOnPage: 284,
      clicks: 67,
    },
    engagementRate: 0.054,
  },
  {
    id: "sprint1-lico-1",
    platform: "linkedin-ivinco",
    title: "Share: Infrastructure Gap",
    publishedDate: "2026-03-10",
    topic: "agentic-commerce",
    metrics: {
      impressions: 1890,
      likes: 42,
      comments: 8,
      shares: 11,
      clicks: 156,
    },
    engagementRate: 0.0323,
  },
  {
    id: "sprint1-x-2",
    platform: "x",
    title: "Immigration observation",
    publishedDate: "2026-03-10",
    framework: "Setup-Punchline",
    topic: "personal",
    metrics: {
      impressions: 8900,
      likes: 214,
      comments: 28,
      shares: 47,
      saves: 31,
    },
    engagementRate: 0.0325,
  },
  {
    id: "sprint1-li-2",
    platform: "linkedin",
    title: "OpenAI ACP Pullback",
    publishedDate: "2026-03-11",
    framework: "STF",
    topic: "agentic-commerce",
    metrics: {
      impressions: 6340,
      likes: 189,
      comments: 52,
      shares: 27,
      clicks: 134,
    },
    engagementRate: 0.0423,
  },
  {
    id: "sprint1-x-3",
    platform: "x",
    title: "OpenAI pullback angle",
    publishedDate: "2026-03-11",
    framework: "Setup-Punchline",
    topic: "agentic-commerce",
    metrics: {
      impressions: 18700,
      likes: 156,
      comments: 23,
      shares: 89,
      saves: 42,
    },
    engagementRate: 0.0143,
  },
  {
    id: "sprint1-blog-2",
    platform: "blog",
    title: "China Is Already Living in the Agentic Commerce Future",
    publishedDate: "2026-03-12",
    topic: "agentic-commerce",
    metrics: {
      pageviews: 2180,
      impressions: 2180,
      avgTimeOnPage: 312,
      clicks: 94,
    },
    engagementRate: 0.043,
  },
  {
    id: "sprint1-lico-2",
    platform: "linkedin-ivinco",
    title: "Share: China Agentic Commerce",
    publishedDate: "2026-03-12",
    topic: "agentic-commerce",
    metrics: {
      impressions: 2340,
      likes: 58,
      comments: 14,
      shares: 19,
      clicks: 201,
    },
    engagementRate: 0.0389,
  },
  {
    id: "sprint1-x-4",
    platform: "x",
    title: "\"English has 'I miss you.' Russian has 6 different verbs\"",
    publishedDate: "2026-03-12",
    framework: "Tension-Release",
    topic: "personal",
    metrics: {
      impressions: 31200,
      likes: 892,
      comments: 147,
      shares: 234,
      saves: 89,
    },
    engagementRate: 0.0408,
  },
  {
    id: "sprint1-li-3",
    platform: "linkedin",
    title: "B2B Is the Real Agentic Commerce Story",
    publishedDate: "2026-03-13",
    framework: "VSQ",
    topic: "agentic-commerce",
    metrics: {
      impressions: 3920,
      likes: 98,
      comments: 41,
      shares: 15,
      clicks: 72,
    },
    engagementRate: 0.0393,
  },
  {
    id: "sprint1-x-5",
    platform: "x",
    title: "Range tweet — movies",
    publishedDate: "2026-03-13",
    topic: "personal",
    metrics: {
      impressions: 5400,
      likes: 112,
      comments: 18,
      shares: 9,
      saves: 7,
    },
    engagementRate: 0.0257,
  },
  {
    id: "sprint1-ig-1",
    platform: "instagram",
    title: "Запах борща в чужом подъезде",
    publishedDate: "2026-03-13",
    framework: "The Scene",
    topic: "personal",
    metrics: {
      impressions: 680,
      likes: 89,
      comments: 23,
      shares: 4,
      saves: 31,
    },
    engagementRate: 0.1706,
  },
  {
    id: "sprint1-li-4",
    platform: "linkedin",
    title: "Discovery from research briefs",
    publishedDate: "2026-03-16",
    framework: "AIDA",
    topic: "agentic-commerce",
    metrics: {
      impressions: 5180,
      likes: 142,
      comments: 38,
      shares: 22,
      clicks: 97,
    },
    engagementRate: 0.039,
  },
  {
    id: "sprint1-x-6",
    platform: "x",
    title: "Agentic commerce compressed take",
    publishedDate: "2026-03-16",
    framework: "Compressed PAS",
    topic: "agentic-commerce",
    metrics: {
      impressions: 9800,
      likes: 67,
      comments: 8,
      shares: 21,
      saves: 11,
    },
    engagementRate: 0.0098,
  },
  {
    id: "sprint1-lico-3",
    platform: "linkedin-ivinco",
    title: "UCP integration learnings",
    publishedDate: "2026-03-17",
    topic: "agentic-commerce",
    metrics: {
      impressions: 1560,
      likes: 34,
      comments: 12,
      shares: 7,
      clicks: 89,
    },
    engagementRate: 0.034,
  },
  {
    id: "sprint1-x-7",
    platform: "x",
    title: "Fatherhood moment",
    publishedDate: "2026-03-17",
    framework: "Micro-Story",
    topic: "personal",
    metrics: {
      impressions: 7200,
      likes: 189,
      comments: 34,
      shares: 28,
      saves: 19,
    },
    engagementRate: 0.0349,
  },
  {
    id: "sprint1-li-5",
    platform: "linkedin",
    title: "Reactive news take",
    publishedDate: "2026-03-18",
    framework: "HSO",
    topic: "agentic-commerce",
    metrics: {
      impressions: 7240,
      likes: 201,
      comments: 67,
      shares: 34,
      clicks: 156,
    },
    engagementRate: 0.0417,
  },
  {
    id: "sprint1-x-8",
    platform: "x",
    title: "News follow-up compressed",
    publishedDate: "2026-03-18",
    framework: "Tension-Release",
    topic: "agentic-commerce",
    metrics: {
      impressions: 14300,
      likes: 109,
      comments: 19,
      shares: 52,
      saves: 23,
    },
    engagementRate: 0.0126,
  },
  {
    id: "sprint1-fb-1",
    platform: "facebook",
    title: "Сын спросил «папа, ты откуда?»",
    publishedDate: "2026-03-18",
    framework: "Question-Without-Answer",
    topic: "personal",
    metrics: {
      impressions: 420,
      likes: 67,
      comments: 31,
      shares: 8,
    },
    engagementRate: 0.2524,
  },
  {
    id: "sprint1-lico-4",
    platform: "linkedin-ivinco",
    title: "Share: Amazon's Walled Garden",
    publishedDate: "2026-03-19",
    topic: "agentic-commerce",
    metrics: {
      impressions: 1780,
      likes: 39,
      comments: 6,
      shares: 14,
      clicks: 112,
    },
    engagementRate: 0.0331,
  },
  {
    id: "sprint1-blog-3",
    platform: "blog",
    title: "Amazon's Walled Garden Strategy for AI Shopping",
    publishedDate: "2026-03-19",
    topic: "agentic-commerce",
    metrics: {
      pageviews: 890,
      impressions: 890,
      avgTimeOnPage: 247,
      clicks: 42,
    },
    engagementRate: 0.047,
  },
  {
    id: "sprint1-x-9",
    platform: "x",
    title: "Translation observation",
    publishedDate: "2026-03-19",
    framework: "The Inversion",
    topic: "personal",
    metrics: {
      impressions: 6100,
      likes: 134,
      comments: 22,
      shares: 15,
      saves: 12,
    },
    engagementRate: 0.028,
  },
  {
    id: "sprint1-li-6",
    platform: "linkedin",
    title: "Discovery or Contrarian",
    publishedDate: "2026-03-20",
    framework: "BAB",
    topic: "agentic-commerce",
    metrics: {
      impressions: 4560,
      likes: 115,
      comments: 29,
      shares: 16,
      clicks: 81,
    },
    engagementRate: 0.0351,
  },
  {
    id: "sprint1-x-10",
    platform: "x",
    title: "Week-end observation",
    publishedDate: "2026-03-20",
    topic: "personal",
    metrics: {
      impressions: 4200,
      likes: 87,
      comments: 11,
      shares: 6,
      saves: 5,
    },
    engagementRate: 0.0248,
  },
];

export const sprintMeta = {
  label: "Sprint 1: March 9–20, 2026",
  startDate: "2026-03-09",
  endDate: "2026-03-20",
  planned: 26,
};
