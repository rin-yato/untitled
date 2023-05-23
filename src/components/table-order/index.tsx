import React from "react"

import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text"
import { Icons } from "@/components/icons"
import OrderList from "@/components/table-order/order-list"

export default function TableOrder() {
  return (
    <div className="flex min-w-[25vw] max-w-[25vw] flex-col border-l-2 px-5 py-9">
      <span className="mb-6 flex items-center justify-between">
        <span className="flex flex-col">
          <Text variant="subheading">Table 6</Text>
          <Text variant="caption" className="pl-1 text-muted-foreground">
            started 7m ago
          </Text>
        </span>
        <Button variant="outline" className="h-fit rounded-full p-2">
          <Icons.plus size="32" />
        </Button>
      </span>
      <section className="h-full">
        <OrderList />
      </section>
    </div>
  )
}
