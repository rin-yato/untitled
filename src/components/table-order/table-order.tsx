"use client"

import React from "react"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import { useAtom } from "jotai"

import Text from "@/components/ui/text"
import { OrderList } from "@/components/table-order"
import TableOrderMenu from "@/components/table-order/dropdown-menu"

export default function TableOrder() {
  const [session] = useAtom(selectedSessionAtom)

  if (!session) return <Text variant="heading">Lmao</Text>

  return (
    <div className="flex min-w-[25vw] max-w-[25vw] flex-col border-l-2 px-5 py-9">
      <span className="mb-6 flex items-center justify-between">
        <span className="flex flex-col">
          <Text variant="subheading">Table {session.table.number}</Text>
          <Text variant="caption" className="pl-1 text-muted-foreground">
            started 7m ago
          </Text>
        </span>
        <TableOrderMenu />
      </span>
      <section className="h-full">
        <OrderList orders={session.orders || []} />
      </section>
    </div>
  )
}
