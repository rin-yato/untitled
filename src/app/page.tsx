"use client"

import { useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import Text from "@/components/ui/text"
import PickMenuDialog from "@/components/dialog/pick-menu-dialog"
import { PickTableDialog } from "@/components/dialog/pick-table-dialog"
import TableCard from "@/components/table-card"

export default function IndexPage() {
  const [tables, setTables] = useState<number[]>([])
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease",
  })

  return (
    <section className="flex flex-1 flex-col items-start justify-start overflow-y-auto px-5 pb-10 pt-8">
      <Text
        variant="heading"
        className="mb-11 select-none underline underline-offset-4"
      >
        Table
      </Text>
      <div ref={parent} className="grid w-full grid-cols-4 gap-5">
        {tables.map((table, index) => (
          <TableCard key={index} id={table} />
        ))}
        <PickTableDialog
          filter={tables}
          onPickTable={(id) => setTables([...tables, id])}
        />
      </div>
    </section>
  )
}
