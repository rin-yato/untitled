import React from "react"

import { OrderWithItem } from "@/lib/types/api/sessions"
import { Button } from "@/components/ui/button"
import { PickMenuDialog } from "@/components/dialog"
import { OrderItem } from "@/components/table-order"

type Props = {
  orders: Array<OrderWithItem>
}

export default function OrderList({ orders }: Props) {
  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="flex flex-col gap-2">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
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
