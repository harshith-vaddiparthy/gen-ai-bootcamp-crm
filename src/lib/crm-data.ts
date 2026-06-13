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
