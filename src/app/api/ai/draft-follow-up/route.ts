import { NextResponse } from "next/server"
import { z } from "zod"

import { runStructuredCRMTask } from "@/lib/ai/openai"

export const runtime = "nodejs"

const requestSchema = z.object({
  recipient: z.string().min(1),
  goal: z.string().min(1),
  tone: z.enum(["direct", "warm", "executive", "technical"]).default("direct"),
  context: z.record(z.string(), z.unknown()),
})

const draftSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    subject: { type: "string" },
    body: { type: "string" },
    tone: { type: "string" },
    reviewChecklist: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["subject", "body", "tone", "reviewChecklist"],
}

type FollowUpDraft = {
  subject: string
  body: string
  tone: string
  reviewChecklist: string[]
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid draft-follow-up payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const result = await runStructuredCRMTask<FollowUpDraft>({
    name: "crm_follow_up_draft",
    schema: draftSchema,
    instructions:
      "You are Sales Copilot for a CRM. Draft concise sales follow-up emails from the provided context. Keep the email specific, honest, and ready for human review before sending.",
    input: JSON.stringify(parsed.data),
    maxOutputTokens: 1200,
  })

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status })
  }

  return NextResponse.json(result)
}
