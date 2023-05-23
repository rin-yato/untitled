import React from "react"

import { Button } from "@/components/ui/button"
import { PickMenuDialog } from "@/components/dialog"
import { OrderItem } from "@/components/table-order"

type Props = {
  items: Array<{ itemId: number; quantity: number }>
}

export default function OrderList({ items }: Props) {
  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <OrderItem key={i} item={item} />
        ))}
        <PickMenuDialog />
      </ul>

      {/* <div className="flex flex-col rounded-xl bg-accent p-3"> */}
      <Button size="xl" className="rounded-full">
        Check Out
      </Button>
      {/* </div> */}
    </div>
  )
}
