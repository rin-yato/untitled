"use client"

import React, { MouseEvent, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { OrderWithItem } from "@/types/api/sessions"
import useOrder from "@/hooks/use-order"
import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text"

import { OrderItemConfig } from "./order-item-config"

type Props = {
  order: OrderWithItem
}

export function OrderItem({ order }: Props) {
  const { updateOrder } = useOrder()
  const [open, setOpen] = useState(false)
  const [autoAnimateParent] = useAutoAnimate({
    duration: 200,
    easing: "ease-in-out",
  })

  const toggleOpen = (event: MouseEvent<HTMLLIElement>) => {
    setOpen(!open)
  }

  const handleUpdateOrder = (
    event: MouseEvent<HTMLButtonElement>,
    amount: number
  ) => {
    event.stopPropagation()

    const newQuantity = order.quantity + amount

    updateOrder(order.id, newQuantity)
  }

  // If there isnt an item, dont render the order item
  if (!order.item) return null

  return (
    <li
      ref={autoAnimateParent}
      onClick={toggleOpen}
      className="flex cursor-pointer select-none flex-col rounded-lg border-2 py-2.5 pl-4 pr-3 dark:bg-accent"
    >
      <div className="flex justify-between">
        <span className="flex w-fit items-center gap-2">
          <Text variant="caption" className="w-fit">
            {order.item.name}
          </Text>
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="hover-ring"
            onClick={(e) => handleUpdateOrder(e, -1)}
          >
            -
          </Button>
          <Button variant="secondary" className="text-emerald-500">
            {order.quantity}
          </Button>
          <Button
            variant="secondary"
            className="hover-ring"
            onClick={(e) => handleUpdateOrder(e, 1)}
          >
            +
          </Button>
        </div>
      </div>

      {open && <OrderItemConfig key="open" order={order} />}
    </li>
  )
}
