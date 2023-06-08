"use client"

import React from "react"

import useTable from "@/hooks/use-table"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { TableCard } from "@/components/table-card"

export default function TableList() {
  const { tables } = useTable()

  return (
    <div className=" grid h-full w-full grid-cols-7 gap-5">
      {tables.map((table) => (
        <TableCard key={table.id} number={table.number} />
      ))}
      <Button
        size="xl"
        variant="accent"
        className="aspect-square h-fit w-full ring-emerald-500 hover:ring-1 dark:ring-emerald-100"
        onClick={() => {}}
      >
        <Icons.plus size="44" />
      </Button>
    </div>
  )
}
