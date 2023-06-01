import { useMemo } from "react"
import { insertSessionSchema } from "@/drizzle/schema/sessions"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import axios from "axios"
import { useAtom } from "jotai"
import useSwr from "swr"

import { SessionsResponse } from "@/types/api/sessions"
import { fetcher } from "@/lib/utils"
import useAlert from "@/hooks/use-alert"
import useTable from "@/hooks/use-table"

export default function useSession() {
  const { createAlert } = useAlert()

  // Store a reference to the selected session
  const [selectedSessionReference, setSelectedSession] =
    useAtom(selectedSessionAtom)

  const { tables } = useTable()

  // sessions containing orders and items
  const { data, mutate } = useSwr<Array<SessionsResponse>>(
    "/api/session",
    fetcher
  )

  // find the selected session from the data
  const selectedSession = useMemo(() => {
    if (!selectedSessionReference) return undefined
    return data?.find((session) => session.id === selectedSessionReference.id)
  }, [selectedSessionReference, data])

  const addSession = (tableId: string) => {
    const createSessionData = insertSessionSchema.parse({ tableId })

    const optimisticData = [
      {
        id: Math.random(),
        tableId,
        orders: [],
        table: tables.find((table) => table.id === tableId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...(data || []),
    ] as Array<SessionsResponse>

    axios.post("/api/session", createSessionData).then(() => mutate())
  }

  const updateSession = (tableId: string) => {
    const updateSessionData = insertSessionSchema.partial().parse({ tableId })

    if (!data || !selectedSession) return

    const optimisticData = data?.map((session) => {
      if (session.id === selectedSession?.id) {
        return {
          ...session,
          tableId,
          table: tables.find((table) => table.id === tableId)!,
        }
      }
      return session
    })

    mutate(optimisticData, false)

    axios
      .put(`/api/session/${selectedSession.id}`, updateSessionData)
      .then(() => mutate())
  }

  const deleteSession = () => {
    if (!selectedSessionReference) return
    createAlert({
      title: "Delete Table",
      description: "Are you sure you want to delete this table?",
      confirmText: "Delete",
      type: "destructive",
      onConfirm: () => {
        const optimisticData = data?.filter(
          (session) => session.id !== selectedSessionReference.id
        )
        mutate(optimisticData, false)
        setSelectedSession(null)
        axios
          .delete(`/api/session/${selectedSessionReference.id}`)
          .then(() => mutate())
      },
    })
  }

  const selectSession = (session: SessionsResponse) => {
    setSelectedSession(session)
  }

  return {
    sessions: data || [],
    mutate,
    addSession,
    updateSession,
    deleteSession,
    selectedSession,
    selectSession,
  }
}
