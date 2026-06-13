import { CRMShell } from "@/components/crm-shell"
import { SalesCopilotChat } from "@/components/sales-copilot-chat"
import { recommendationCards } from "@/lib/crm-data"
import { SparklesIcon } from "lucide-react"

export default function AIRecommendationsPage() {
  return (
    <CRMShell page="AI Recommendations" eyebrow="Sales Copilot is grounded in CRM context">
      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SparklesIcon className="size-4 text-sky-600" />
            Recommendations
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Turn CRM signals into sales actions.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            These recommendations are intentionally review-first: the AI can
            explain, draft, and structure work, but the seller stays in control.
          </p>
        </div>
        <div className="grid gap-3">
          {recommendationCards.map((card) => (
            <div key={card.title} className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {card.why}
                  </p>
                </div>
                <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                  {card.priority}
                </span>
              </div>
              <p className="mt-3 rounded-md bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800">
                {card.suggestedAction}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SalesCopilotChat />
    </CRMShell>
  )
}
