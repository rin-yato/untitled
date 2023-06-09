import { Table } from "@/drizzle/schema/tables"
import axios from "axios"
import { atom, useAtom } from "jotai"
import useSWR from "swr"
import { z } from "zod"

import { fetcher } from "@/lib/utils"

import useAlert from "./use-alert"

const pickTableSchema = z.object({
  filter: z.array(z.number()).optional(),
  onPick: z.function().args(z.number()).returns(z.void()),
})

export type PickTableAtom = z.infer<typeof pickTableSchema>

const pickTableAtom = atom<PickTableAtom | null>(null)

export default function useTable() {
  const { data: tables, mutate } = useSWR<Array<Table>>("/api/table", fetcher)
  const [pickTableData, setPickTableData] = useAtom(pickTableAtom)
  const { createAlert } = useAlert()

  const pickTable = ({ onPick, filter }: PickTableAtom) => {
    const pickTableCreateData = pickTableSchema.parse({ onPick, filter })
    setPickTableData(pickTableCreateData)
  }

  const closePickTable = () => {
    setPickTableData(null)
  }

  const createTable = async (number: number) => {
    await axios.post("/api/table", { number })
    mutate()
  }

  const deleteTable = async (id: number) => {
    await createAlert({
      title: "Are you sure you want to delete this table?",
      description: "This is a permanent action. And cannot be undone.",
      type: "destructive",
      onConfirm: async () => {
        await axios.delete(`/api/table/${id}`)
        mutate()
      },
    })
  }

  const updateTable = async (id: number, number: number) => {
    await axios.put(`/api/table/${id}`, { number })
    mutate()
  }

  return {
    tables: tables || [],
    mutate,
    pickTable,
    closePickTable,
    pickTableData,
    createTable,
    deleteTable,
    updateTable,
  }
}
