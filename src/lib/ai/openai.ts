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
const OUT_OF_SCOPE_RESPONSE =
  "I am only a Sales Copilot for CRM work. I can help with pipeline, forecast, deals, accounts, contacts, follow-ups, CRM hygiene, and sales emails. Ask me a sales or CRM question and I will help."

const SALES_DOMAIN_KEYWORDS = [
  "account",
  "buyer",
  "call",
  "champion",
  "close",
  "commit",
  "contact",
  "crm",
  "customer",
  "deal",
  "discovery",
  "email",
  "follow",
  "forecast",
  "lead",
  "legal",
  "meeting",
  "mercury",
  "northstar",
  "opportunity",
  "pipeline",
  "procurement",
  "proposal",
  "quota",
  "relayworks",
  "revenue",
  "risk",
  "sales",
  "task",
]

let openaiClient: OpenAI | null = null

function isSalesDomainQuestion(content: string) {
  const normalized = content.toLowerCase()

  return SALES_DOMAIN_KEYWORDS.some((keyword) => normalized.includes(keyword))
}

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
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user")?.content

  if (latestUserMessage && !isSalesDomainQuestion(latestUserMessage)) {
    return {
      ok: true,
      message: OUT_OF_SCOPE_RESPONSE,
      model: "domain-gate",
    }
  }

  const transcript = messages
    .slice(-10)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n")

  try {
    const response = await client.responses.create({
      model,
      instructions:
        "You are PulseCRM Sales Copilot, a narrow CRM and sales assistant. You must only answer questions about sales work: pipeline, forecast, deals, accounts, contacts, leads, activities, follow-ups, sales emails, discovery, procurement, close plans, CRM hygiene, or the provided CRM context. If the user asks anything outside sales or CRM, refuse briefly with exactly this message: \"I am only a Sales Copilot for CRM work. I can help with pipeline, forecast, deals, accounts, contacts, follow-ups, CRM hygiene, and sales emails. Ask me a sales or CRM question and I will help.\" Never answer general knowledge, cooking, coding, health, travel, entertainment, or personal advice questions. Do not claim to update records or send emails. When recommending an action, make it specific and reviewable.",
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
