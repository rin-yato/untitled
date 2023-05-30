

import { useEffect } from "react"
import tablesAtom from "@/jotai/tables-atom"
import { useAtom } from "jotai"

export default function useTable() {
  const [tables, setTable] = useAtom(tablesAtom)

  function fetchTables() {
    fetch("/api/table").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setTable(data)
        })
      }
    })
  }

  useEffect(() => {
    fetchTables()
  }, [])

  return {
    tables,
    fetchTables,
  }
}
