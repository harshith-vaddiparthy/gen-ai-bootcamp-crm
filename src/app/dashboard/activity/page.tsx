import { CRMShell } from "@/components/crm-shell"
import { getCRMData } from "@/lib/crm-repository"
import { ActivityIcon, ClipboardCheckIcon, MailIcon, PhoneCallIcon } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function TeamActivityPage() {
  const { accountTimeline, activityInsights, repActivity, teamActivityStats, source } =
    await getCRMData()

  return (
    <CRMShell
      page="Team Activity"
      eyebrow={
        source === "supabase"
          ? "Live activity from Supabase"
          : "Demo activity until Supabase is configured"
      }
    >
      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">
          Sales activity cockpit
        </p>
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
          See whether the team is creating enough real buyer momentum.
        </h1>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {teamActivityStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Rep activity</h2>
              <p className="text-sm text-muted-foreground">
                Calls, emails, meetings, and CRM hygiene by rep.
              </p>
            </div>
            <ActivityIcon className="size-5 text-zinc-700" />
          </div>
          <div className="mt-5 overflow-hidden rounded-md border">
            {repActivity.map((rep) => (
              <div
                key={rep.rep}
                className="grid gap-3 border-b bg-background p-4 last:border-b-0 md:grid-cols-[1.2fr_repeat(4,0.7fr)]"
              >
                <div>
                  <p className="font-medium">{rep.rep}</p>
                  <p className="text-sm text-muted-foreground">{rep.focus}</p>
                </div>
                <span className="text-sm">
                  <PhoneCallIcon className="mr-1 inline size-4" />
                  {rep.calls}
                </span>
                <span className="text-sm">
                  <MailIcon className="mr-1 inline size-4" />
                  {rep.emails}
                </span>
                <span className="text-sm">
                  <ClipboardCheckIcon className="mr-1 inline size-4" />
                  {rep.meetings}
                </span>
                <span className="text-sm font-medium">
                  {rep.crmHygiene}% hygiene
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-zinc-950 p-5 text-white shadow-sm">
          <h2 className="text-lg font-semibold">Activity insights</h2>
          <p className="mt-1 text-sm text-zinc-300">
            The activity signals that matter for pipeline quality.
          </p>
          <div className="mt-5 space-y-3">
            {activityInsights.map((insight) => (
              <div
                key={insight}
                className="rounded-md border border-white/10 bg-white/7 p-3 text-sm leading-6 text-zinc-100"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Latest account activity</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {accountTimeline.map((event) => (
            <div key={`${event.account}-${event.time}`} className="rounded-md border bg-background p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                  {event.type}
                </span>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
              <p className="mt-3 font-medium">{event.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{event.account}</p>
            </div>
          ))}
        </div>
      </section>
    </CRMShell>
  )
}
