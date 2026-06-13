import { NextResponse } from "next/server"
import { z } from "zod"

import { runSalesCopilotChat } from "@/lib/ai/openai"
import { copilotContext } from "@/lib/crm-data"

export const runtime = "nodejs"

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
})

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
})

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid copilot-chat payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const result = await runSalesCopilotChat({
    messages: parsed.data.messages,
    context: copilotContext,
  })

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status })
  }

  return NextResponse.json(result)
}
