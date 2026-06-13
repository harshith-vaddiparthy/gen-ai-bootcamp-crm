import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  accountTimeline,
  copilotSuggestions,
  dashboardKpis,
  followUpTasks,
  pipelineStages,
  priorityDeals,
} from "@/lib/crm-data"
import {
  ArrowUpRightIcon,
  BotIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  Clock3Icon,
  MailIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-3 border-b bg-background/92 px-4 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">PulseCRM</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Revenue Command Center</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <SparklesIcon className="size-3.5 text-sky-600" />
            <span>24 AI suggestions waiting for review</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-5 bg-[#f7f7f2] p-4 md:p-6">
          <section className="grid gap-3 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Sales team workspace
                  </p>
                  <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Pipeline risk, next actions, and AI-reviewed follow-ups in
                    one place.
                  </h1>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                  <TrendingUpIcon className="size-4" />
                  Forecast up 12%
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-zinc-950 p-5 text-white shadow-sm">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <BotIcon className="size-4 text-sky-300" />
                Sales Copilot
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                Start with human-reviewed AI.
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                The CRM can summarize records, draft follow-ups, and structure
                messy notes without writing directly to customer records.
              </p>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {dashboardKpis.map((kpi) => (
              <div key={kpi.label} className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </p>
                  <span
                    className={[
                      "size-2.5 rounded-full",
                      kpi.tone === "emerald" && "bg-emerald-500",
                      kpi.tone === "sky" && "bg-sky-500",
                      kpi.tone === "amber" && "bg-amber-500",
                      kpi.tone === "rose" && "bg-rose-500",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </div>
                <div className="mt-4 text-3xl font-semibold tracking-tight">
                  {kpi.value}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{kpi.change}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Pipeline by stage</h2>
                  <p className="text-sm text-muted-foreground">
                    Fast MVP view of deal value, count, and conversion health.
                  </p>
                </div>
                <CircleDollarSignIcon className="size-5 text-emerald-600" />
              </div>
              <div className="mt-5 grid gap-4">
                {pipelineStages.map((stage) => (
                  <div key={stage.name}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <div>
                        <span className="font-medium">{stage.name}</span>
                        <span className="ml-2 text-muted-foreground">
                          {stage.deals} deals
                        </span>
                      </div>
                      <span className="font-semibold">{stage.value}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-zinc-900"
                        style={{ width: `${stage.conversion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Priority deals</h2>
                  <p className="text-sm text-muted-foreground">
                    Deal detail preview for the current selling week.
                  </p>
                </div>
                <ArrowUpRightIcon className="size-5 text-sky-600" />
              </div>
              <div className="mt-5 space-y-3">
                {priorityDeals.map((deal) => (
                  <div
                    key={deal.account}
                    className="rounded-md border bg-background p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{deal.account}</p>
                        <p className="text-sm text-muted-foreground">{deal.deal}</p>
                      </div>
                      <span className="rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700">
                        {deal.amount}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                      <span>{deal.stage}</span>
                      <span>{deal.owner}</span>
                      <span>Close {deal.closeDate}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">{deal.health}</p>
                      <span className="text-sm text-muted-foreground">
                        Score {deal.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Follow-up queue</h2>
                  <p className="text-sm text-muted-foreground">
                    Tasks are connected to deals and accounts.
                  </p>
                </div>
                <CalendarClockIcon className="size-5 text-amber-600" />
              </div>
              <div className="mt-5 space-y-3">
                {followUpTasks.map((task) => (
                  <div
                    key={`${task.account}-${task.title}`}
                    className="flex items-start gap-3 rounded-md border bg-background p-3"
                  >
                    <CheckCircle2Icon className="mt-0.5 size-5 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.account} · {task.owner}
                      </p>
                    </div>
                    <span
                      className={[
                        "rounded-md px-2 py-1 text-xs font-medium",
                        task.due === "Overdue"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      {task.due}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Account timeline</h2>
                  <p className="text-sm text-muted-foreground">
                    Recent relationship activity across active opportunities.
                  </p>
                </div>
                <Clock3Icon className="size-5 text-zinc-600" />
              </div>
              <div className="mt-5 space-y-4">
                {accountTimeline.map((event) => (
                  <div key={`${event.account}-${event.time}`} className="flex gap-3">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                      {event.type === "Email" ? (
                        <MailIcon className="size-4" />
                      ) : (
                        <Clock3Icon className="size-4" />
                      )}
                    </div>
                    <div className="min-w-0 border-b pb-4 last:border-b-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
                          {event.type}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {event.time}
                        </span>
                      </div>
                      <p className="mt-2 font-medium">{event.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.account}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border bg-zinc-950 p-5 text-white shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <SparklesIcon className="size-4 text-sky-300" />
                  Sales Copilot review queue
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  AI can suggest the work. Sales keeps control.
                </h2>
              </div>
              <span className="rounded-md bg-white px-3 py-2 text-sm font-medium text-zinc-950">
                Review required before save
              </span>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {copilotSuggestions.map((suggestion) => (
                <div
                  key={suggestion.title}
                  className="rounded-lg border border-white/10 bg-white/7 p-4"
                >
                  <p className="font-semibold">{suggestion.title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {suggestion.detail}
                  </p>
                  <button className="mt-4 rounded-md bg-sky-300 px-3 py-2 text-sm font-medium text-zinc-950 transition hover:bg-sky-200">
                    {suggestion.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
