"use client"

import React, { MouseEvent, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { OrderWithItem } from "@/types/api/sessions"
import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text"
import { OrderItemConfig } from "@/components/table-order"

type Props = {
  order: OrderWithItem
}

export default function OrderItem({ order }: Props) {
  const [open, setOpen] = useState(false)
  const [autoAnimateParent] = useAutoAnimate({
    duration: 200,
    easing: "ease-in-out",
  })

  const toggleOpen = (event: MouseEvent<HTMLLIElement>) => {
    setOpen(!open)
  }

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

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
            onClick={handleAdd}
          >
            -
          </Button>
          <Button
            variant="secondary"
            className="text-emerald-500"
            onClick={handleAdd}
          >
            {order.quantity}
          </Button>
          <Button
            variant="secondary"
            className="hover-ring"
            onClick={handleAdd}
          >
            +
          </Button>
        </div>
      </div>

      {open && <OrderItemConfig key="open" />}
    </li>
  )
}
