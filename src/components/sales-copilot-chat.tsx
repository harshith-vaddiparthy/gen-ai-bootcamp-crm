"use client"

import * as React from "react"
import { BotIcon, Loader2Icon, SendIcon, UserIcon } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

const starterMessages: Message[] = [
  {
    role: "assistant",
    content:
      "I am your Sales Copilot. Ask me what changed in forecast, which deal needs attention, or have me draft a follow-up from the CRM context.",
  },
]

const prompts = [
  "What should I do first today?",
  "Which deal is most likely to slip?",
  "Draft a follow-up for Northstar legal review.",
  "Summarize the forecast risk for my manager.",
]

export function SalesCopilotChat() {
  const [messages, setMessages] = React.useState<Message[]>(starterMessages)
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function sendMessage(messageText = input) {
    const trimmed = messageText.trim()

    if (!trimmed || isLoading) {
      return
    }

    const nextMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: trimmed,
      },
    ]

    setMessages(nextMessages)
    setInput("")
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/copilot-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.filter((message) => message.role !== "assistant" || message.content !== starterMessages[0].content),
        }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.error ||
            "Sales Copilot could not respond. Check your OpenAI setup."
        )
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: payload.message,
        },
      ])
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Sales Copilot could not respond."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-[680px] gap-5 xl:grid-cols-[0.72fr_1.28fr]">
      <aside className="rounded-lg border bg-zinc-950 p-5 text-white shadow-sm">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <BotIcon className="size-4 text-sky-300" />
          AI-powered sales desk
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Ask sharper questions. Leave with next actions.
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          This copilot is grounded in the demo CRM context: forecast, priority
          deals, recent activity, and follow-up tasks.
        </p>
        <div className="mt-6 grid gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="rounded-md border border-white/10 bg-white/7 px-3 py-2 text-left text-sm text-zinc-100 transition hover:bg-white/12"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-md border border-amber-300/20 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
          Copilot can draft and recommend. It does not send emails or update CRM
          records without review.
        </div>
      </aside>

      <section className="flex min-h-[680px] flex-col rounded-lg border bg-card shadow-sm">
        <div className="border-b p-4">
          <p className="text-sm font-medium text-muted-foreground">
            Sales Copilot Chat
          </p>
          <h2 className="mt-1 text-xl font-semibold">
            Forecast, deals, follow-ups, and CRM hygiene
          </h2>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={[
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              ].join(" ")}
            >
              {message.role === "assistant" ? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sky-100 text-sky-700">
                  <BotIcon className="size-4" />
                </div>
              ) : null}
              <div
                className={[
                  "max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6",
                  message.role === "user"
                    ? "bg-zinc-950 text-white"
                    : "border bg-background text-foreground",
                ].join(" ")}
              >
                {message.content}
              </div>
              {message.role === "user" ? (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-white">
                  <UserIcon className="size-4" />
                </div>
              ) : null}
            </div>
          ))}
          {isLoading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2Icon className="size-4 animate-spin" />
              Thinking through the CRM context...
            </div>
          ) : null}
          {error ? (
            <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
        </div>

        <form
          className="border-t p-4"
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage()
          }}
        >
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask: what should I do first today?"
              className="min-h-11 flex-1 rounded-md border bg-background px-3 text-sm outline-none transition focus:border-zinc-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <SendIcon className="size-4" />
              )}
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
