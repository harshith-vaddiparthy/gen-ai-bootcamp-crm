import { NextResponse } from "next/server"
import { z } from "zod"

import { createCRMNote } from "@/lib/crm-repository"

export const runtime = "nodejs"

const requestSchema = z.object({
  body: z.string().min(4).max(5000),
})

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid note payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const result = await createCRMNote(parsed.data)

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status })
  }

  return NextResponse.json(result)
}
