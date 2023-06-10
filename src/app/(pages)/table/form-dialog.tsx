import React from "react"
import { Table } from "@/drizzle/schema/tables"
import { useDisclosure } from "@mantine/hooks"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import TableForm from "./table-form"

type Props = {
  defaultTable?: Table
  children?: React.ReactNode
}

export default function TableFormDialog({ defaultTable, children }: Props) {
  const [opened, handlers] = useDisclosure(false)
  return (
    <Dialog open={opened} onOpenChange={() => handlers.toggle()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xs">
        <DialogTitle>
          {defaultTable ? "Edit Table" : "Create a new Table"}
        </DialogTitle>
        <DialogDescription>
          {defaultTable
            ? "Edit the details of your table here. You can change the number of your table."
            : "Create a new table for your shop."}
        </DialogDescription>
        <TableForm defaultTable={defaultTable} handlers={handlers} />
      </DialogContent>
    </Dialog>
  )
}
