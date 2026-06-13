import { CRMShell } from "@/components/crm-shell"
import {
  forecastByRep,
  forecastMetrics,
  forecastMovements,
  pipelineStages,
} from "@/lib/crm-data"
import { AlertTriangleIcon, BarChart3Icon, TrendingUpIcon } from "lucide-react"

export default function ForecastPulsePage() {
  return (
    <CRMShell page="Forecast Pulse" eyebrow="Forecast refreshed from live CRM activity">
      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Manager forecast view
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Know what is commit, what is upside, and what is about to slip.
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            <TrendingUpIcon className="size-4" />
            Commit up $38K
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {forecastMetrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{metric.detail}</p>
            <p className="mt-4 rounded-md bg-muted px-2 py-1 text-xs font-medium">
              {metric.change}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Forecast movement</h2>
              <p className="text-sm text-muted-foreground">
                The deals that changed forecast quality this week.
              </p>
            </div>
            <AlertTriangleIcon className="size-5 text-amber-600" />
          </div>
          <div className="mt-5 space-y-3">
            {forecastMovements.map((deal) => (
              <div key={deal.account} className="rounded-md border bg-background p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{deal.account}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {deal.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{deal.amount}</p>
                    <p className="text-xs text-muted-foreground">{deal.movement}</p>
                  </div>
                </div>
                <p className="mt-3 rounded-md bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800">
                  Next action: {deal.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Stage confidence</h2>
              <p className="text-sm text-muted-foreground">
                Conversion quality by current pipeline stage.
              </p>
            </div>
            <BarChart3Icon className="size-5 text-zinc-700" />
          </div>
          <div className="mt-5 grid gap-4">
            {pipelineStages.map((stage) => (
              <div key={stage.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-muted-foreground">
                    {stage.conversion}% confidence
                  </span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-zinc-950"
                    style={{ width: `${stage.conversion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border bg-background">
            {forecastByRep.map((rep) => (
              <div
                key={rep.owner}
                className="grid gap-2 border-b p-3 text-sm last:border-b-0 sm:grid-cols-4"
              >
                <span className="font-medium">{rep.owner}</span>
                <span>Commit {rep.commit}</span>
                <span>Best {rep.bestCase}</span>
                <span>{rep.coverage}x coverage</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CRMShell>
  )
}
