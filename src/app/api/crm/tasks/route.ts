import { NextResponse } from "next/server"
import { z } from "zod"

import { createCRMTask } from "@/lib/crm-repository"

export const runtime = "nodejs"

const requestSchema = z.object({
  title: z.string().min(2).max(200),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  dueDate: z.string().date().optional(),
})

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid task payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const result = await createCRMTask(parsed.data)

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status })
  }

  return NextResponse.json(result)
}
