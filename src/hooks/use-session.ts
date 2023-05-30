"use client"

// import { useEffect } from "react"
import { Session, insertSessionSchema } from "@/drizzle/schema/sessions"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import axios from "axios"
// import { sessionsAtom } from "@/jotai/sessions-atom"
import { useAtom } from "jotai"
import useSwr from "swr"

import { SessionsResponse } from "@/types/api/sessions"
import { fetcher, mockOptimisticData } from "@/lib/utils"
import useAlert from "@/hooks/use-alert"

export default function useSession() {
  const { createAlert } = useAlert()

  // Store a reference to the selected session
  const [selectedSessionReference, setSelectedSession] =
    useAtom(selectedSessionAtom)

  // sessions containing orders and items
  const { data, mutate } = useSwr<Array<SessionsResponse>>(
    "/api/session",
    fetcher
  )

  // find the selected session from the data
  const selectedSession = data?.find(
    (session) => session.id === selectedSessionReference?.id
  )

  const addSession = async (tableId: string) => {
    // const createSessionData = insertSessionSchema.parse({ tableId })
    // const optimisticData = mockOptimisticData(createSessionData, data || [])
    // await mutate(() => axios.get("/api/session"), { optimisticData })
  }

  const updateSession = (id: number, tableId: number) => {
    const updateSessionData = insertSessionSchema.partial().parse({ tableId })
    fetch(`/api/session/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateSessionData),
    }).then((res) => {
      if (res.ok) {
        mutate()
      }
    })
  }

  const deleteSession = () => {
    if (!selectedSessionReference) return
    createAlert({
      title: "Delete Table",
      description: "Are you sure you want to delete this table?",
      confirmText: "Delete",
      type: "destructive",
      onConfirm: () => {
        fetch(`/api/session/${selectedSessionReference.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            mutate()
            setSelectedSession(null)
          }
        })
      },
    })
  }

  return {
    sessions: data || [],
    mutate,
    addSession,
    updateSession,
    deleteSession,
    selectedSession,
  }
}
