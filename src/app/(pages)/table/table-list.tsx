"use client"

import React from "react"

import useTable from "@/hooks/use-table"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"

import TableFormDialog from "./form-dialog"

export default function TableList() {
  const { tables } = useTable()

  return (
    <div className="grid h-full w-full grid-cols-6 gap-5">
      {tables.map((table) => (
        <TableFormDialog key={table.id} defaultTable={table}>
          <div className="clickable cliche-card justify-between">
            <span className="flex flex-col items-start">
              <Text variant="subheading" className="dark:text-secondary">
                Table {table.number}
              </Text>
            </span>
          </div>
        </TableFormDialog>
      ))}
      <TableFormDialog>
        <Button
          size="xl"
          variant="accent"
          className="aspect-square h-fit w-full ring-emerald-500 hover:ring-1 dark:ring-emerald-100"
          onClick={() => {}}
        >
          <Icons.plus size="44" />
        </Button>
      </TableFormDialog>
    </div>
  )
}
