import React from "react"

import { OrderWithItem } from "@/types/api/sessions"
import { Button } from "@/components/ui/button"
import { PickMenuDialog } from "@/components/dialog"

import { CheckoutDialog } from "../checkout"
import { OrderItem } from "./order-item"

type Props = {
  orders: Array<OrderWithItem>
}

export function OrderList({ orders }: Props) {
  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="flex flex-col gap-2">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
        <PickMenuDialog />
      </ul>

      <CheckoutDialog>
        <Button size="xl" className="rounded-full">
          Check Out
        </Button>
      </CheckoutDialog>
    </div>
  )
}
