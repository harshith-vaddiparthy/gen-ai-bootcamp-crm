"use client"

import * as React from "react"
import { Loader2Icon, NotebookPenIcon, PlusIcon } from "lucide-react"

type SaveState =
  | {
      type: "idle"
      message: string
    }
  | {
      type: "success" | "error"
      message: string
    }

export function CRMQuickActions() {
  const [taskTitle, setTaskTitle] = React.useState("Follow up with Mercury Retail")
  const [noteBody, setNoteBody] = React.useState(
    "Mercury discovery was positive, but technical validation is not booked yet."
  )
  const [isSavingTask, setIsSavingTask] = React.useState(false)
  const [isSavingNote, setIsSavingNote] = React.useState(false)
  const [state, setState] = React.useState<SaveState>({
    type: "idle",
    message: "Create real CRM records when Supabase is configured.",
  })

  async function createTask() {
    setIsSavingTask(true)
    setState({ type: "idle", message: "Saving task..." })

    try {
      const response = await fetch("/api/crm/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskTitle,
          priority: "High",
          dueDate: new Date().toISOString().slice(0, 10),
        }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Task could not be saved.")
      }

      setState({
        type: "success",
        message: `Task saved: ${payload.task.title}`,
      })
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error ? error.message : "Task could not be saved.",
      })
    } finally {
      setIsSavingTask(false)
    }
  }

  async function createNote() {
    setIsSavingNote(true)
    setState({ type: "idle", message: "Saving note..." })

    try {
      const response = await fetch("/api/crm/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: noteBody }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Note could not be saved.")
      }

      setState({
        type: "success",
        message: "Note saved to Supabase.",
      })
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error ? error.message : "Note could not be saved.",
      })
    } finally {
      setIsSavingNote(false)
    }
  }

  return (
    <section className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <NotebookPenIcon className="size-4 text-emerald-600" />
        Supabase write actions
      </div>
      <h2 className="mt-2 text-xl font-semibold">Create CRM records</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        These actions call server routes and write to Supabase when project
        credentials are configured.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border bg-background p-4">
          <label className="text-sm font-medium" htmlFor="task-title">
            Task title
          </label>
          <input
            id="task-title"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            className="mt-2 min-h-10 w-full rounded-md border bg-card px-3 text-sm outline-none transition focus:border-zinc-400"
          />
          <button
            type="button"
            onClick={createTask}
            disabled={isSavingTask || !taskTitle.trim()}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSavingTask ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}
            Save task
          </button>
        </div>

        <div className="rounded-md border bg-background p-4">
          <label className="text-sm font-medium" htmlFor="note-body">
            CRM note
          </label>
          <textarea
            id="note-body"
            value={noteBody}
            onChange={(event) => setNoteBody(event.target.value)}
            className="mt-2 min-h-24 w-full resize-none rounded-md border bg-card px-3 py-2 text-sm outline-none transition focus:border-zinc-400"
          />
          <button
            type="button"
            onClick={createNote}
            disabled={isSavingNote || !noteBody.trim()}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSavingNote ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <NotebookPenIcon className="size-4" />
            )}
            Save note
          </button>
        </div>
      </div>

      <p
        className={[
          "mt-4 rounded-md px-3 py-2 text-sm",
          state.type === "success" && "bg-emerald-50 text-emerald-700",
          state.type === "error" && "bg-rose-50 text-rose-700",
          state.type === "idle" && "bg-muted text-muted-foreground",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {state.message}
      </p>
    </section>
  )
}
