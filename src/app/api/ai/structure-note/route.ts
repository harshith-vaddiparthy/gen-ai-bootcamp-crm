import { NextResponse } from "next/server"
import { z } from "zod"

import { runStructuredCRMTask } from "@/lib/ai/openai"

export const runtime = "nodejs"

const requestSchema = z.object({
  note: z.string().min(8),
})

const noteSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    contactName: { type: ["string", "null"] },
    accountName: { type: ["string", "null"] },
    dealName: { type: ["string", "null"] },
    stage: { type: ["string", "null"] },
    amount: { type: ["string", "null"] },
    closeDate: { type: ["string", "null"] },
    nextTask: { type: ["string", "null"] },
    activitySummary: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    fieldsNeedingReview: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "contactName",
    "accountName",
    "dealName",
    "stage",
    "amount",
    "closeDate",
    "nextTask",
    "activitySummary",
    "confidence",
    "fieldsNeedingReview",
  ],
}

type StructuredNote = {
  contactName: string | null
  accountName: string | null
  dealName: string | null
  stage: string | null
  amount: string | null
  closeDate: string | null
  nextTask: string | null
  activitySummary: string
  confidence: number
  fieldsNeedingReview: string[]
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid structure-note payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const result = await runStructuredCRMTask<StructuredNote>({
    name: "crm_structured_note",
    schema: noteSchema,
    instructions:
      "You are Sales Copilot for a CRM. Extract only the CRM fields supported by the schema. Use null when the note does not contain a value. Return fields needing review when a value is inferred or ambiguous.",
    input: parsed.data.note,
  })

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status })
  }

  return NextResponse.json(result)
}
