import { Table } from "@/drizzle/schema/tables"
import { atom, useAtom } from "jotai"
import useSWR from "swr"
import { z } from "zod"

import { fetcher } from "@/lib/utils"

const pickTableSchema = z.object({
  filter: z.array(z.string()).optional(),
  onPick: z.function().args(z.string()).returns(z.void()),
})

export type PickTableAtom = z.infer<typeof pickTableSchema>

const pickTableAtom = atom<PickTableAtom | null>(null)

export default function useTable() {
  const { data: tables, mutate } = useSWR<Array<Table>>("/api/table", fetcher)
  const [pickTableData, setPickTableData] = useAtom(pickTableAtom)

  const pickTable = ({ onPick, filter }: PickTableAtom) => {
    const pickTableCreateData = pickTableSchema.parse({ onPick, filter })
    setPickTableData(pickTableCreateData)
  }

  const closePickTable = () => {
    setPickTableData(null)
  }

  return {
    tables: tables || [],
    mutate,
    pickTable,
    closePickTable,
    pickTableData,
  }
}
