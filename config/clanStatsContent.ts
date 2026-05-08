export const features = [
  { icon: "⚔️", label: "Maneuvers & GM" },
  { icon: "🏆", label: "Tournaments" },
  { icon: "💬", label: "Discord chat" },
  { icon: "🤝", label: "Helping each other" },
  { icon: "📅", label: "Play 3 times a week" },
  { icon: "🌍", label: "European clan" },
] as const;

export const clanStatsContent = {
  "Maneuvers & GM": {
    title: "Maneuvers & GM",
    icon: "⚔️",
    description:
      "We play maneuvers together, discuss tactics, improve teamwork, and help each other during global map events.",
    details: [
      "Regular maneuvers sessions every week",
      "Global Map campaigns and strategic planning",
      "Team coordination and voice communication",
      "Tactical analysis after each battle",
    ],
  },
  Tournaments: {
    title: "Tournaments",
    icon: "🏆",
    description:
      "We join tournaments, train in team play, and work on better coordination for stronger results.",
    details: [
      "Participation in official WoT tournaments",
      "Team training and strategy development",
      "Prize distribution among active members",
      "Friendly competitive atmosphere",
    ],
  },
  "Discord chat": {
    title: "Discord chat",
    icon: "💬",
    description:
      "We use Discord for voice chat, announcements, battle coordination, platoons, and friendly communication.",
    details: [
      "24/7 active voice and text channels",
      "Battle coordination and callouts",
      "Platoon finder and LFG channels",
      "Community events and giveaways",
    ],
  },
  "Helping each other": {
    title: "Helping each other",
    icon: "🤝",
    description:
      "Clan members support each other with advice, replays, training, tactics, and help in different game modes.",
    details: [
      "Replay analysis and personalized tips",
      "Equipment and crew skill recommendations",
      "Mentorship program for newer players",
      "Collaborative learning and skill sharing",
    ],
  },
  "Play 3 times a week": {
    title: "Play 3 times a week",
    icon: "📅",
    description:
      "We usually gather several times a week for organized activities, training sessions, and clan battles.",
    details: [
      "Scheduled clan activities 3+ times per week",
      "Flexible attendance — real life comes first",
      "Organized training and practice sessions",
      "Consistent progress and team synergy",
    ],
  },
  "European clan": {
    title: "European clan",
    icon: "🌍",
    description:
      "We are a European clan with players from different countries, united by teamwork, activity, and a friendly atmosphere.",
    details: [
      "Players from across Europe",
      "English as the main communication language",
      "Active during EU prime time hours",
      "Diverse backgrounds, one team spirit",
    ],
  },
} as const;

export type ClanStatsKey = keyof typeof clanStatsContent;
