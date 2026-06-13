import OpenAI from "openai"

type JsonSchema = {
  [key: string]: unknown
}

type StructuredTaskInput = {
  name: string
  schema: JsonSchema
  instructions: string
  input: string
  maxOutputTokens?: number
}

type StructuredTaskResult<T> =
  | {
      ok: true
      data: T
      model: string
      reviewRequired: true
    }
  | {
      ok: false
      status: number
      error: string
      setupRequired?: boolean
    }

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type CopilotChatResult =
  | {
      ok: true
      message: string
      model: string
    }
  | {
      ok: false
      status: number
      error: string
      setupRequired?: boolean
    }

const DEFAULT_MODEL = "gpt-5.4-mini"
const DEFAULT_BASE_URL = "https://api.openai.com/v1"

let openaiClient: OpenAI | null = null

function getClient() {
  const apiKey = process.env.CRM_OPENAI_API_KEY ?? process.env.OPENAI_API_KEY

  if (!apiKey) {
    return null
  }

  openaiClient ??= new OpenAI({
    apiKey,
    baseURL: process.env.CRM_OPENAI_BASE_URL ?? DEFAULT_BASE_URL,
  })

  return openaiClient
}

export async function runStructuredCRMTask<T>({
  name,
  schema,
  instructions,
  input,
  maxOutputTokens = 900,
}: StructuredTaskInput): Promise<StructuredTaskResult<T>> {
  const client = getClient()

  if (!client) {
    return {
      ok: false,
      status: 503,
      error:
        "OPENAI_API_KEY is missing. Add it to your environment before using Sales Copilot routes.",
      setupRequired: true,
    }
  }

  try {
    const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL
    const response = await client.responses.create({
      model,
      instructions,
      input,
      max_output_tokens: maxOutputTokens,
      text: {
        format: {
          type: "json_schema",
          name,
          schema,
          strict: true,
        },
      },
    })

    if (!response.output_text) {
      return {
        ok: false,
        status: 502,
        error: "The model returned no structured output.",
      }
    }

    return {
      ok: true,
      data: JSON.parse(response.output_text) as T,
      model,
      reviewRequired: true,
    }
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error:
        error instanceof Error
          ? error.message
          : "Sales Copilot failed to generate a response.",
    }
  }
}

export async function runSalesCopilotChat({
  messages,
  context,
}: {
  messages: ChatMessage[]
  context: unknown
}): Promise<CopilotChatResult> {
  const client = getClient()

  if (!client) {
    return {
      ok: false,
      status: 503,
      error:
        "OPENAI_API_KEY is missing. Add it to your environment before using Sales Copilot chat.",
      setupRequired: true,
    }
  }

  const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL
  const transcript = messages
    .slice(-10)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n")

  try {
    const response = await client.responses.create({
      model,
      instructions:
        "You are PulseCRM Sales Copilot. Be direct, practical, and sales-operator useful. Use the CRM context provided. Help with forecast risk, next actions, follow-up drafts, discovery prep, deal summaries, and CRM hygiene. Do not claim to update records or send emails. When recommending an action, make it specific and reviewable.",
      input: `CRM CONTEXT:\n${JSON.stringify(context, null, 2)}\n\nCHAT:\n${transcript}`,
      max_output_tokens: 900,
    })

    return {
      ok: true,
      message:
        response.output_text ||
        "I could not produce a response. Try asking a narrower sales question.",
      model,
    }
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error:
        error instanceof Error
          ? error.message
          : "Sales Copilot chat failed to generate a response.",
    }
  }
}
