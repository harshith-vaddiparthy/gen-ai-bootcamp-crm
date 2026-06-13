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

const DEFAULT_MODEL = "gpt-5.4-mini"
const DEFAULT_BASE_URL = "https://api.openai.com/v1"

let openaiClient: OpenAI | null = null

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null
  }

  openaiClient ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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
