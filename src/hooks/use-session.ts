"use client"

import { useEffect } from "react"
import { insertSessionSchema } from "@/drizzle/schema/sessions"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import { sessionsAtom } from "@/jotai/sessions-atom"
import { useAtom } from "jotai"

import useAlert from "@/hooks/use-alert"

export default function useSession() {
  const { createAlert } = useAlert()
  const [sessions, setSessions] = useAtom(sessionsAtom)
  const [selectedSession, setSelectedSession] = useAtom(selectedSessionAtom)

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

  const deleteSession = () => {
    if (!selectedSession) return
    createAlert({
      title: "Delete Table",
      description: "Are you sure you want to delete this table?",
      confirmText: "Delete",
      type: "destructive",
      onConfirm: () => {
        fetch(`/api/session/${selectedSession.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            fetchSessions()
          }
        })
      },
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
    deleteSession,
    selectedSession,
  }
}
