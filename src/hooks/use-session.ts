import {  insertSessionSchema } from "@/drizzle/schema/sessions"
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

  // sessions containing orders and items
  const { data, mutate } = useSwr<Array<SessionsResponse>>(
    "/api/session",
    fetcher
  )

  const { tables } = useTable()

  // find the selected session from the data
  const selectedSession = data?.find(
    (session) => session.id === selectedSessionReference?.id
  )

  const addSession = async (tableId: string) => {
    const createSessionData = insertSessionSchema.parse({ tableId })
    await axios.post("/api/session", createSessionData)
    mutate()
  }

  const updateSession = async (id: number, tableId: number) => {
    const updateSessionData = insertSessionSchema.partial().parse({ tableId })

    await axios.put(`/api/session/${id}`, updateSessionData)
   
    mutate()
  }

  const deleteSession = () => {
    if (!selectedSessionReference) return
    createAlert({
      title: "Delete Table",
      description: "Are you sure you want to delete this table?",
      confirmText: "Delete",
      type: "destructive",
      onConfirm: () => {
        axios.delete(`/api/session/${selectedSessionReference.id}`)
          .then(() => {
          
            mutate()
            setSelectedSession(null)
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
