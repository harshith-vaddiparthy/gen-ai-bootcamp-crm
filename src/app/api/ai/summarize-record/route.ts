import { NextResponse } from "next/server"
import { z } from "zod"

import { runStructuredCRMTask } from "@/lib/ai/openai"

export const runtime = "nodejs"

const requestSchema = z.object({
  recordType: z.enum(["lead", "contact", "account", "deal"]),
  record: z.record(z.string(), z.unknown()),
  activities: z.array(z.record(z.string(), z.unknown())).default([]),
  openTasks: z.array(z.record(z.string(), z.unknown())).default([]),
})

const summarySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    health: {
      type: "string",
      enum: ["Strong", "Needs Attention", "At Risk"],
    },
    risks: {
      type: "array",
      items: { type: "string" },
    },
    nextActions: {
      type: "array",
      items: { type: "string" },
    },
    fieldsToReview: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["summary", "health", "risks", "nextActions", "fieldsToReview"],
}

type RecordSummary = {
  summary: string
  health: "Strong" | "Needs Attention" | "At Risk"
  risks: string[]
  nextActions: string[]
  fieldsToReview: string[]
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid summarize-record payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const result = await runStructuredCRMTask<RecordSummary>({
    name: "crm_record_summary",
    schema: summarySchema,
    instructions:
      "You are Sales Copilot for a lightweight CRM. Summarize the record, identify concrete sales risks, and propose next actions. Do not invent facts. Mark uncertain fields for human review.",
    input: JSON.stringify(parsed.data),
  })

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status })
  }

  return NextResponse.json(result)
}
