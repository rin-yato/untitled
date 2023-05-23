"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import useReceipt from "@/hooks/use-receipt"
import Text from "@/components/ui/text"
import { PickTableDialog } from "@/components/dialog"
import { TableCard } from "@/components/table-card"

export default function IndexPage() {
  const { receipts, addReceipt } = useReceipt()
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
        {receipts.map((receipt, index) => (
          <TableCard key={index} id={receipt.tableId} />
        ))}
        <PickTableDialog
          filter={receipts.map((receipt) => receipt.tableId)}
          onPickTable={(id) => addReceipt(id)}
        />
      </div>
    </section>
  )
}
