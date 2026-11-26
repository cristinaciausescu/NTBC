// Mock data shaped for the WorkHub dashboard. Replace with API/state later.

export const user = {
  name: "O'Hara D",
  level: 3,
  levelTitle: "Specialist",
  xp: 320,
  xpNext: 500,
  streakDays: 14,
  avatar: null,
};

export const workPackages = [
  { id: "sharpview", name: "Sharpview", progress: 70, xp: 120, color: "blue" },
  { id: "mset", name: "MSET", progress: 45, xp: 80, color: "purple" },
  { id: "crowsnest", name: "Crowsnest", progress: 20, xp: 50, color: "green" },
];

// effort: "easy" | "medium" | "hard" — easy tasks are shown first
export const needsYou = [
  {
    id: 1,
    createdAt: "2026-11-18T09:00:00",
    type: "Action",
    title: "November reporting",
    body: "Solution Work Package review",
    daysLeft: 2,
    xp: 20,
    effort: "hard",
  },
  {
    id: 2,
    createdAt: "2026-11-19T14:30:00",
    type: "Action",
    title: "Milestone commentary",
    body: "Steve Ball has requested commentary",
    xp: 15,
    effort: "medium",
  },
  {
    id: 3,
    createdAt: "2026-11-25T16:10:00",
    type: "Mention",
    title: "McCartney B mention you",
    body: "Hi there Duncan, can you submit X, Y and Z before the end of the day?",
    xp: 10,
    effort: "easy",
  },
  {
    id: 4,
    createdAt: "2026-11-24T10:45:00",
    type: "Mention",
    title: "Reply to Murphy D",
    body: "Confirm the Solution Work Package is ready for review",
    xp: 5,
    effort: "easy",
  },
  {
    id: 5,
    createdAt: "2026-11-21T11:20:00",
    type: "Action",
    title: "Approve timesheet",
    body: "Sharpview — 3 entries waiting",
    xp: 8,
    effort: "easy",
  },
  {
    id: 6,
    createdAt: "2026-11-22T15:05:00",
    type: "Action",
    title: "Update MSET status",
    body: "Add progress for the Data Validation milestone",
    xp: 12,
    effort: "medium",
  },
  {
    id: 7,
    createdAt: "2026-11-23T08:40:00",
    type: "Action",
    title: "Crowsnest audit",
    body: "Full review of open items and dependencies",
    xp: 25,
    effort: "hard",
  },
];

export const milestones = [
  { id: "overdue", label: "Overdue", count: 3, sub: "Up to 2 weeks late", xp: 60, tone: "danger" },
  { id: "thisweek", label: "This week", count: 4, sub: "4 items", xp: 40, tone: "neutral" },
  { id: "nextweek", label: "Next week", count: 4, sub: "4 items", xp: 40, tone: "neutral" },
  { id: "upcoming", label: "Upcoming", count: "10+", sub: "10+ items", xp: 100, tone: "neutral" },
];

export const feed = [
  {
    id: 1,
    author: "Murphy D",
    tag: "Sharpview",
    when: "Today",
    text: "Please ensure you complete your Solution Work Package today.",
  },
  {
    id: 2,
    author: "Simeanu E.",
    tag: "MSET",
    when: "Yesterday",
    text: "Added a new milestone: Data Validation",
  },
];

export const badges = [
  { id: "first-finish", name: "First Finish", desc: "Complete your first work package", color: "green", icon: "check" },
  { id: "fast-responder", name: "Fast Responder", desc: "Reply within 24h (10x)", color: "purple", icon: "bolt" },
  { id: "zero-overdue", name: "Zero Overdue", desc: "No overdue items for 30 days", color: "orange", icon: "star" },
  { id: "team-player", name: "Team Player", desc: "Help 10 colleagues", color: "blue", icon: "people" },
];

export const missions = [
  { id: 1, label: "Complete all 4 items due this week", xp: 50, done: 0, total: 4 },
  { id: 2, label: "Clear your 3 overdue items", xp: 60, done: 0, total: 3 },
  { id: 3, label: "Reply to all mentions", xp: 30, done: 0, total: 3 },
];

export const leaderboard = [
  { rank: 1, name: "Moran Joe", xp: 850 },
  { rank: 2, name: "O'Hara D", xp: 720, me: true },
  { rank: 3, name: "Sava Tiberiu", xp: 640 },
  { rank: 4, name: "Simeanu E.-M.", xp: 580 },
  { rank: 5, name: "McCartney B", xp: 530 },
];
