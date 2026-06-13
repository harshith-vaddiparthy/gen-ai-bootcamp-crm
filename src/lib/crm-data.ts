export const dashboardKpis = [
  {
    label: "Open pipeline",
    value: "$842K",
    change: "+18% vs last month",
    tone: "emerald",
  },
  {
    label: "Weighted forecast",
    value: "$392K",
    change: "74% confidence",
    tone: "sky",
  },
  {
    label: "At-risk deals",
    value: "7",
    change: "3 need action today",
    tone: "amber",
  },
  {
    label: "Follow-ups due",
    value: "24",
    change: "9 overdue",
    tone: "rose",
  },
]

export const pipelineStages = [
  {
    name: "Qualified",
    value: "$214K",
    deals: 18,
    conversion: 42,
  },
  {
    name: "Discovery",
    value: "$188K",
    deals: 11,
    conversion: 51,
  },
  {
    name: "Proposal",
    value: "$260K",
    deals: 9,
    conversion: 63,
  },
  {
    name: "Negotiation",
    value: "$180K",
    deals: 5,
    conversion: 78,
  },
]

export const priorityDeals = [
  {
    account: "Northstar Labs",
    deal: "Platform expansion",
    owner: "Avery Jones",
    stage: "Negotiation",
    amount: "$96K",
    closeDate: "Jun 28",
    health: "Needs legal follow-up",
    score: 82,
  },
  {
    account: "RelayWorks",
    deal: "RevOps automation pilot",
    owner: "Mina Patel",
    stage: "Proposal",
    amount: "$74K",
    closeDate: "Jul 3",
    health: "Champion active",
    score: 76,
  },
  {
    account: "Mercury Retail",
    deal: "Regional rollout",
    owner: "Jordan Lee",
    stage: "Discovery",
    amount: "$118K",
    closeDate: "Jul 18",
    health: "No next meeting",
    score: 58,
  },
]

export const accountTimeline = [
  {
    type: "Call",
    title: "Procurement confirmed security review is the blocker",
    account: "Northstar Labs",
    time: "Today, 10:20 AM",
  },
  {
    type: "Email",
    title: "Sent ROI calculator and implementation plan",
    account: "RelayWorks",
    time: "Yesterday, 4:42 PM",
  },
  {
    type: "Meeting",
    title: "Discovery with finance and operations stakeholders",
    account: "Mercury Retail",
    time: "Yesterday, 1:00 PM",
  },
  {
    type: "Note",
    title: "Champion asked for a CFO-ready summary by Friday",
    account: "Northstar Labs",
    time: "Mon, 3:18 PM",
  },
]

export const followUpTasks = [
  {
    title: "Send legal redline summary",
    account: "Northstar Labs",
    owner: "Avery",
    due: "Today",
    priority: "High",
  },
  {
    title: "Draft CFO business case",
    account: "Northstar Labs",
    owner: "Avery",
    due: "Tomorrow",
    priority: "High",
  },
  {
    title: "Confirm pilot success metrics",
    account: "RelayWorks",
    owner: "Mina",
    due: "Jun 16",
    priority: "Medium",
  },
  {
    title: "Book technical discovery",
    account: "Mercury Retail",
    owner: "Jordan",
    due: "Overdue",
    priority: "High",
  },
]

export const copilotSuggestions = [
  {
    title: "Northstar deal summary",
    detail:
      "Legal review is the only visible blocker. Next best move is a concise redline summary plus CFO-facing ROI note.",
    action: "Review summary",
  },
  {
    title: "Mercury next step risk",
    detail:
      "Discovery went well, but there is no next meeting. Ask for a technical stakeholder session before the deal ages.",
    action: "Draft follow-up",
  },
  {
    title: "RelayWorks note cleanup",
    detail:
      "Latest call note includes success metrics, buyer role, and rollout timeline. AI can structure it into CRM fields.",
    action: "Structure note",
  },
]

export const forecastMetrics = [
  {
    label: "Commit forecast",
    value: "$392K",
    detail: "74% confidence",
    change: "+12% from last week",
  },
  {
    label: "Best case",
    value: "$621K",
    detail: "14 active opportunities",
    change: "+$82K newly qualified",
  },
  {
    label: "Likely slip",
    value: "$148K",
    detail: "5 deals need executive action",
    change: "2 moved from green to amber",
  },
]

export const forecastMovements = [
  {
    account: "Northstar Labs",
    amount: "$96K",
    movement: "Commit",
    reason: "Legal has a fixed review window and the champion confirmed budget.",
    action: "Send redline summary today",
  },
  {
    account: "Mercury Retail",
    amount: "$118K",
    movement: "Slip Risk",
    reason: "No technical stakeholder meeting is booked after discovery.",
    action: "Schedule technical discovery",
  },
  {
    account: "RelayWorks",
    amount: "$74K",
    movement: "Upside",
    reason: "Pilot success criteria are clear and procurement is already engaged.",
    action: "Confirm approval path",
  },
  {
    account: "AtlasBio",
    amount: "$52K",
    movement: "At Risk",
    reason: "Champion changed roles and there is no replacement buyer mapped.",
    action: "Identify new economic buyer",
  },
]

export const forecastByRep = [
  {
    owner: "Avery Jones",
    commit: "$168K",
    bestCase: "$244K",
    risk: "Medium",
    coverage: 3.2,
  },
  {
    owner: "Mina Patel",
    commit: "$126K",
    bestCase: "$203K",
    risk: "Low",
    coverage: 4.1,
  },
  {
    owner: "Jordan Lee",
    commit: "$98K",
    bestCase: "$174K",
    risk: "High",
    coverage: 2.1,
  },
]

export const teamActivityStats = [
  {
    label: "Calls logged",
    value: "46",
    detail: "18 with decision makers",
  },
  {
    label: "Emails sent",
    value: "132",
    detail: "34 follow-ups generated from notes",
  },
  {
    label: "Meetings booked",
    value: "19",
    detail: "7 technical validations",
  },
  {
    label: "CRM updates",
    value: "88",
    detail: "21 AI-assisted",
  },
]

export const repActivity = [
  {
    rep: "Avery Jones",
    focus: "Enterprise closers",
    calls: 14,
    emails: 39,
    meetings: 7,
    crmHygiene: 92,
  },
  {
    rep: "Mina Patel",
    focus: "Mid-market pilots",
    calls: 17,
    emails: 54,
    meetings: 8,
    crmHygiene: 87,
  },
  {
    rep: "Jordan Lee",
    focus: "Retail pipeline",
    calls: 9,
    emails: 26,
    meetings: 3,
    crmHygiene: 68,
  },
  {
    rep: "Sam Rivera",
    focus: "Expansion",
    calls: 6,
    emails: 13,
    meetings: 1,
    crmHygiene: 76,
  },
]

export const activityInsights = [
  "Jordan has the most at-risk pipeline and the lowest meeting conversion this week.",
  "Avery is on track, but two high-value tasks are due before end of day.",
  "Mina's follow-up quality is strong: 4 of 6 proposal-stage deals have next steps confirmed.",
]

export const recommendationCards = [
  {
    title: "Protect Northstar commit",
    priority: "High",
    why: "Legal is the only blocker on a $96K deal. The buyer needs a concise summary before Friday's review.",
    suggestedAction: "Draft a legal redline summary and CFO-ready ROI email.",
  },
  {
    title: "Unstick Mercury Retail",
    priority: "High",
    why: "The discovery call was positive, but no technical stakeholder is attached and the close date is slipping.",
    suggestedAction: "Ask for a technical validation meeting with operations and IT.",
  },
  {
    title: "Clean RelayWorks notes",
    priority: "Medium",
    why: "The latest notes contain pilot metrics, timeline, and buyer roles that are not yet structured in CRM fields.",
    suggestedAction: "Convert the call note into CRM updates and review before saving.",
  },
]

export const copilotContext = {
  workspace: "PulseCRM Sales",
  currentForecast: "$392K commit on $842K open pipeline",
  biggestRisks: [
    "Mercury Retail has no next meeting",
    "AtlasBio lost its champion",
    "Northstar legal review needs seller-owned follow-up",
  ],
  topDeals: priorityDeals,
  tasks: followUpTasks,
  recentActivity: accountTimeline,
}
