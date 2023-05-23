"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import useTable from "@/hooks/use-table"
import Text from "@/components/ui/text"
import { PickTableDialog } from "@/components/dialog"
import { TableCard } from "@/components/table-card"
import ToastDemo from "@/components/toast-demo"

export default function IndexPage() {
  const { tables, addTable } = useTable()
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
      <ToastDemo />
      <div ref={parent} className="grid w-full grid-cols-4 gap-5">
        {tables.map((table, index) => (
          <TableCard key={index} id={table.id} />
        ))}
        <PickTableDialog
          filter={tables.map((table) => table.id)}
          onPickTable={(id) => addTable(id)}
        />
      </div>
    </section>
  )
}
