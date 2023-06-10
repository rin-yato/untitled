"use client"

import React from "react"

import useSession from "@/hooks/use-session"
import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"

import { OrderDropdownMenu } from "./dropdown-menu"
import { OrderList } from "./order-list"

export function Orders() {
  const { selectedSession: session } = useSession()

  if (!session)
    return (
      <div className="flex w-[25vw] max-w-[25vw] flex-col border-l-2 px-5 py-9">
        <div className="m-auto flex flex-col items-center text-muted-foreground">
          <Icons.banana className="" size="55" />
          <Text variant="subheading" className="mt-4">
            No table selected
          </Text>
        </div>
      </div>
    )

  return (
    <div className="flex w-[25vw] flex-col border-l-2 px-5 py-9">
      <span className="mb-6 flex items-center justify-between">
        <span className="flex flex-col">
          <Text variant="subheading">Table {session.table.number}</Text>
          <Text variant="caption" className="pl-1 text-muted-foreground">
            started 7m ago
          </Text>
        </span>
        <OrderDropdownMenu />
      </span>
      <section className="h-full">
        <OrderList orders={session.orders} />
      </section>
    </div>
  )
}
