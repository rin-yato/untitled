import { useMemo } from "react"
import { insertSessionSchema } from "@/drizzle/schema/sessions"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import axios from "axios"
import { produce } from "immer"
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

  const addSession = (tableId: number) => {
    const createSessionData = insertSessionSchema.parse({ tableId })

    const newSessionMockData: SessionsResponse = {
      ...createSessionData,
      id: Math.floor(Math.random() * 100_000),
      createdAt: new Date(),
      updatedAt: new Date(),
      table: tables.find((table) => table.id === tableId)!,
      orders: [],
      isActive: true,
    }

    const optimisticData = produce(data, (draft) => {
      draft?.unshift(newSessionMockData)
    })

    mutate(optimisticData, false)

    axios.post("/api/session", createSessionData).then(() => mutate())
  }

  const updateSession = (tableId: number) => {
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
