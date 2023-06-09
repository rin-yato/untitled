"use client"

import { ColumnDef } from "@tanstack/react-table"

import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { DataTableColumnHeader } from "@/components/data-table/column-header"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string
  tableNumber: number
  amountUsd: number
  amountKhr: number
  status: "paid" | "waiting" | "cancelled"
  createdAt: Date
}

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")

      const variant =
        status === "paid"
          ? "successSoft"
          : status === "waiting"
          ? "warningSoft"
          : "destructiveSoft"

      return <Badge variant={variant}>{status}</Badge>
    },
    filterFn: (row, id, filterValues) => {
      const status = row.getValue<string>("status")
      return filterValues.includes(status)
    },
  },
  {
    accessorKey: "tableNumber",
    header: ({ column }) => (
      <DataTableColumnHeader minimal column={column} title="Table Number" />
    ),
    cell: ({ row }) => {
      const tableNumber = row.getValue<number>("tableNumber")
      return <div className="pl-3 font-medium">{tableNumber}</div>
    },
  },
  {
    accessorKey: "amountUsd",
    header: ({ column }) => (
      <DataTableColumnHeader minimal column={column} title="Amount USD" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountUsd"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "amountKhr",
    header: ({ column }) => (
      <DataTableColumnHeader minimal column={column} title="Amount KHR" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountKhr"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KHR",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader minimal column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue<Date>("createdAt")
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date)

      return <div className="font-medium">{formatted}</div>
    },
    filterFn: (row, id, filterValues) => {
      const sd = filterValues[0] ? new Date(filterValues[0]) : undefined
      const ed = filterValues[1] ? new Date(filterValues[1]) : undefined

      if (ed || sd) {
        const cellDate = new Date(row.getValue("createdAt"))

        if (ed && sd) {
          return cellDate >= sd && cellDate <= ed
        } else if (sd) {
          return cellDate >= sd
        } else if (ed) {
          return cellDate <= ed
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Icons.moreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.amountKhr.toString())
              }}
            >
              <CopyButton />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem isDestructive>
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function CopyButton() {
  const { toast } = useToast()

  return (
    <div
      onClick={() =>
        toast({
          icon: "copy",
          title: "Copied KHR amount to clipboard.",
        })
      }
    >
      Copy amount in KHR
    </div>
  )
}
