import React from "react"

import OrderItem from "@/components/table-order/order-item"

export default function OrderList() {
  return (
    <ul className="flex flex-col gap-2">
      {[...Array(7)].map((_, i) => (
        <OrderItem key={i} />
      ))}
    </ul>
  )
}
