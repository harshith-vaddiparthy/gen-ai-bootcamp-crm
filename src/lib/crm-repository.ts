import {
  accountTimeline as fallbackAccountTimeline,
  copilotContext as fallbackCopilotContext,
  copilotSuggestions as fallbackCopilotSuggestions,
  dashboardKpis as fallbackDashboardKpis,
  followUpTasks as fallbackFollowUpTasks,
  forecastByRep as fallbackForecastByRep,
  forecastMetrics as fallbackForecastMetrics,
  forecastMovements as fallbackForecastMovements,
  pipelineStages as fallbackPipelineStages,
  priorityDeals as fallbackPriorityDeals,
  recommendationCards as fallbackRecommendationCards,
  repActivity as fallbackRepActivity,
  teamActivityStats as fallbackTeamActivityStats,
  activityInsights,
} from "@/lib/crm-data"
import { createSupabaseServiceClient } from "@/lib/supabase/server"

const DEMO_WORKSPACE_ID = "00000000-0000-0000-0000-000000000001"

type SupabaseClient = NonNullable<ReturnType<typeof createSupabaseServiceClient>>
type StageRow = {
  id: string
  name: string
  sort_order: number
  win_probability: number
}
type DealRow = {
  id: string
  name: string
  amount: number
  probability: number
  close_date: string | null
  health: string
  next_step: string | null
  score: number
  accounts: { name: string } | null
  crm_users: { name: string } | null
  pipeline_stages: { name: string } | null
}
type TaskRow = {
  id: string
  title: string
  due_date: string | null
  priority: string
  accounts: { name: string } | null
  crm_users: { name: string } | null
}
type ActivityRow = {
  id: string
  type: string
  summary: string
  occurred_at: string
  accounts: { name: string } | null
}
type SuggestionRow = {
  title: string
  detail: string
  payload: { action?: string } | null
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: value >= 100000 ? "compact" : "standard",
  }).format(value)
}

function formatCloseDate(value: string | null) {
  if (!value) {
    return "No date"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`))
}

function formatActivityTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

function formatDueDate(value: string | null) {
  if (!value) {
    return "No date"
  }

  const due = new Date(`${value}T00:00:00Z`)
  const today = new Date()
  const todayUtc = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  )
  const diffDays = Math.round(
    (due.getTime() - todayUtc.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays < 0) return "Overdue"
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"

  return formatCloseDate(value)
}

async function loadRows(client: SupabaseClient) {
  const [stages, deals, tasks, activities, suggestions] = await Promise.all([
    client
      .from("pipeline_stages")
      .select("id, name, sort_order, win_probability")
      .eq("workspace_id", DEMO_WORKSPACE_ID)
      .order("sort_order"),
    client
      .from("deals")
      .select(
        "id, name, amount, probability, close_date, health, next_step, score, accounts(name), crm_users(name), pipeline_stages(name)"
      )
      .eq("workspace_id", DEMO_WORKSPACE_ID)
      .order("amount", { ascending: false }),
    client
      .from("tasks")
      .select("id, title, due_date, priority, accounts(name), crm_users(name)")
      .eq("workspace_id", DEMO_WORKSPACE_ID)
      .eq("status", "open")
      .order("due_date"),
    client
      .from("activities")
      .select("id, type, summary, occurred_at, accounts(name)")
      .eq("workspace_id", DEMO_WORKSPACE_ID)
      .order("occurred_at", { ascending: false })
      .limit(8),
    client
      .from("ai_suggestions")
      .select("title, detail, payload")
      .eq("workspace_id", DEMO_WORKSPACE_ID)
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
  ])

  const error =
    stages.error ||
    deals.error ||
    tasks.error ||
    activities.error ||
    suggestions.error

  if (error) {
    throw error
  }

  return {
    stages: stages.data as unknown as StageRow[],
    deals: deals.data as unknown as DealRow[],
    tasks: tasks.data as unknown as TaskRow[],
    activities: activities.data as unknown as ActivityRow[],
    suggestions: suggestions.data as unknown as SuggestionRow[],
  }
}

export async function getCRMData() {
  const client = createSupabaseServiceClient()

  if (!client) {
    return {
      source: "fallback" as const,
      dashboardKpis: fallbackDashboardKpis,
      pipelineStages: fallbackPipelineStages,
      priorityDeals: fallbackPriorityDeals,
      accountTimeline: fallbackAccountTimeline,
      followUpTasks: fallbackFollowUpTasks,
      copilotSuggestions: fallbackCopilotSuggestions,
      forecastMetrics: fallbackForecastMetrics,
      forecastMovements: fallbackForecastMovements,
      forecastByRep: fallbackForecastByRep,
      teamActivityStats: fallbackTeamActivityStats,
      repActivity: fallbackRepActivity,
      activityInsights,
      recommendationCards: fallbackRecommendationCards,
      copilotContext: fallbackCopilotContext,
    }
  }

  try {
    const rows = await loadRows(client)
    const openPipeline = rows.deals.reduce((sum, deal) => sum + deal.amount, 0)
    const weightedForecast = rows.deals.reduce(
      (sum, deal) => sum + deal.amount * (deal.probability / 100),
      0
    )
    const atRiskDeals = rows.deals.filter(
      (deal) =>
        deal.health.toLowerCase().includes("risk") ||
        deal.health.toLowerCase().includes("no next") ||
        deal.score < 65
    )
    const overdueTasks = rows.tasks.filter((task) => formatDueDate(task.due_date) === "Overdue")

    const pipelineStages = rows.stages.map((stage) => {
      const stageDeals = rows.deals.filter(
        (deal) => deal.pipeline_stages?.name === stage.name
      )

      return {
        name: stage.name,
        value: formatCurrency(
          stageDeals.reduce((sum, deal) => sum + deal.amount, 0)
        ),
        deals: stageDeals.length,
        conversion: stage.win_probability,
      }
    })

    const priorityDeals = rows.deals.slice(0, 3).map((deal) => ({
      account: deal.accounts?.name ?? "Unknown account",
      deal: deal.name,
      owner: deal.crm_users?.name ?? "Unassigned",
      stage: deal.pipeline_stages?.name ?? "No stage",
      amount: formatCurrency(deal.amount),
      closeDate: formatCloseDate(deal.close_date),
      health: deal.health,
      score: deal.score,
    }))

    const accountTimeline = rows.activities.map((activity) => ({
      type: activity.type,
      title: activity.summary,
      account: activity.accounts?.name ?? "Unknown account",
      time: formatActivityTime(activity.occurred_at),
    }))

    const followUpTasks = rows.tasks.map((task) => ({
      title: task.title,
      account: task.accounts?.name ?? "Unknown account",
      owner: task.crm_users?.name?.split(" ")[0] ?? "Unassigned",
      due: formatDueDate(task.due_date),
      priority: task.priority,
    }))

    const copilotSuggestions = rows.suggestions.map((suggestion) => ({
      title: suggestion.title,
      detail: suggestion.detail,
      action: suggestion.payload?.action ?? "Review",
    }))

    return {
      source: "supabase" as const,
      dashboardKpis: [
        {
          label: "Open pipeline",
          value: formatCurrency(openPipeline),
          change: `${rows.deals.length} active opportunities`,
          tone: "emerald",
        },
        {
          label: "Weighted forecast",
          value: formatCurrency(weightedForecast),
          change: "Calculated from deal probability",
          tone: "sky",
        },
        {
          label: "At-risk deals",
          value: String(atRiskDeals.length),
          change: `${atRiskDeals.slice(0, 3).length} need action now`,
          tone: "amber",
        },
        {
          label: "Follow-ups due",
          value: String(rows.tasks.length),
          change: `${overdueTasks.length} overdue`,
          tone: "rose",
        },
      ],
      pipelineStages,
      priorityDeals,
      accountTimeline,
      followUpTasks,
      copilotSuggestions,
      forecastMetrics: fallbackForecastMetrics,
      forecastMovements: fallbackForecastMovements,
      forecastByRep: fallbackForecastByRep,
      teamActivityStats: fallbackTeamActivityStats,
      repActivity: fallbackRepActivity,
      activityInsights,
      recommendationCards: fallbackRecommendationCards,
      copilotContext: {
        workspace: "PulseCRM Sales",
        currentForecast: `${formatCurrency(weightedForecast)} weighted on ${formatCurrency(openPipeline)} open pipeline`,
        biggestRisks: atRiskDeals.map((deal) => `${deal.accounts?.name}: ${deal.health}`),
        topDeals: priorityDeals,
        tasks: followUpTasks,
        recentActivity: accountTimeline,
      },
    }
  } catch (error) {
    console.error("Supabase CRM load failed; using fallback data", error)
    return getCRMDataWithoutSupabase()
  }
}

function getCRMDataWithoutSupabase() {
  return {
    source: "fallback" as const,
    dashboardKpis: fallbackDashboardKpis,
    pipelineStages: fallbackPipelineStages,
    priorityDeals: fallbackPriorityDeals,
    accountTimeline: fallbackAccountTimeline,
    followUpTasks: fallbackFollowUpTasks,
    copilotSuggestions: fallbackCopilotSuggestions,
    forecastMetrics: fallbackForecastMetrics,
    forecastMovements: fallbackForecastMovements,
    forecastByRep: fallbackForecastByRep,
    teamActivityStats: fallbackTeamActivityStats,
    repActivity: fallbackRepActivity,
    activityInsights,
    recommendationCards: fallbackRecommendationCards,
    copilotContext: fallbackCopilotContext,
  }
}

export async function createCRMTask(input: {
  title: string
  priority?: string
  dueDate?: string
}) {
  const client = createSupabaseServiceClient()

  if (!client) {
    return {
      ok: false,
      status: 503,
      error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    }
  }

  const { data: owner } = await client
    .from("crm_users")
    .select("id")
    .eq("workspace_id", DEMO_WORKSPACE_ID)
    .limit(1)
    .maybeSingle()

  const { data, error } = await client
    .from("tasks")
    .insert({
      workspace_id: DEMO_WORKSPACE_ID,
      owner_id: owner?.id,
      title: input.title,
      priority: input.priority ?? "Medium",
      due_date: input.dueDate ?? null,
    })
    .select("id, title, due_date, priority, status")
    .single()

  if (error) {
    return {
      ok: false,
      status: 500,
      error: error.message,
    }
  }

  return {
    ok: true,
    task: data,
  }
}

export async function createCRMNote(input: { body: string }) {
  const client = createSupabaseServiceClient()

  if (!client) {
    return {
      ok: false,
      status: 503,
      error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    }
  }

  const { data: author } = await client
    .from("crm_users")
    .select("id")
    .eq("workspace_id", DEMO_WORKSPACE_ID)
    .limit(1)
    .maybeSingle()

  const { data, error } = await client
    .from("notes")
    .insert({
      workspace_id: DEMO_WORKSPACE_ID,
      author_id: author?.id,
      body: input.body,
    })
    .select("id, body, created_at")
    .single()

  if (error) {
    return {
      ok: false,
      status: 500,
      error: error.message,
    }
  }

  return {
    ok: true,
    note: data,
  }
}
