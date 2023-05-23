import tablesAtom from "@/store/tables-atom"
import { useAtom } from "jotai"

import { Table } from "@/types/entities/table"

export default function useTable() {
  const [tables, setTables] = useAtom(tablesAtom)

  const addTable = (table: Table) => {
    setTables([...tables, table])
  }

  const removeTable = (table: Table) => {
    setTables(tables.filter((t) => t.id !== table.id))
  }

  const updateTable = (table: Table) => {
    setTables(tables.map((t) => (t.id === table.id ? table : t)))
  }

  return {
    tables,
    addTable,
    removeTable,
    updateTable,
  }
}
