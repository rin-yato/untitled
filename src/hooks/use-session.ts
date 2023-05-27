"use client"

import { useEffect } from "react"
import { insertSessionSchema } from "@/drizzle/schema/sessions"
import { sessionsAtom } from "@/jotai/sessions-atom"
import { useAtom } from "jotai"

export default function useSession() {
  const [sessions, setSessions] = useAtom(sessionsAtom)

  const addSession = (tableId: string) => {
    const createSessionData = insertSessionSchema.parse({ tableId })
    fetch("/api/session", {
      method: "POST",
      body: JSON.stringify(createSessionData),
    }).then((res) => {
      if (res.ok) {
        fetchSessions()
      }
    })
  }

  const updateSession = (id: number, tableId: number) => {
    const updateSessionData = insertSessionSchema.partial().parse({ tableId })
    fetch(`/api/session/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateSessionData),
    }).then((res) => {
      if (res.ok) {
        fetchSessions()
      }
    })
  }

  const fetchSessions = () => {
    fetch("/api/session").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setSessions(data)
        })
      }
    })
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  return {
    sessions,
    addSession,
    updateSession,
  }
}
