"use client"

import React from "react"

import { OrderWithItem } from "@/types/api/sessions"
import useOrder from "@/hooks/use-order"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  order: OrderWithItem
}

export function OrderItemConfig({ order }: Props) {
  const { updateOrder, deleteOrder } = useOrder()

  const handleUpdateOrder = (amount: number) => {
    const newQuantity = order.quantity + amount
    updateOrder(order.id, newQuantity)
  }

  if (!order) return null

  return (
    <div className="mt-1 grid grid-flow-col gap-1 pt-2">
      <Button
        onClick={() => handleUpdateOrder(6)}
        variant="secondary"
        className="hover-ring"
      >
        +6
      </Button>
      <Button
        onClick={() => handleUpdateOrder(4)}
        variant="secondary"
        className="hover-ring"
      >
        +4
      </Button>
      <Button
        onClick={() => handleUpdateOrder(2)}
        variant="secondary"
        className="hover-ring"
      >
        +2
      </Button>
      <Button variant="secondary" className="hover-ring">
        more
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          deleteOrder(order.id)
        }}
        variant="destructive"
      >
        <Icons.trash size="20" />
      </Button>
    </div>
  )
}
