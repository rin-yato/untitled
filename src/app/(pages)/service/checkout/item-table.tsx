import React, { useMemo } from "react"

import useSession from "@/hooks/use-session"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Text from "@/components/ui/text"

export function ItemTable() {
  const { selectedSession } = useSession()

  const total = useMemo(() => {
    return selectedSession?.orders.reduce((acc, order) => {
      return acc + order.item.price * order.quantity
    }, 0)
  }, [selectedSession])

  if (!selectedSession || !total) return null

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-inherit">
          <TableHead className="pl-0">Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="pr-0 text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedSession.orders.map((order) => (
          <TableRow className="hover:bg-inherit">
            <TableCell className="pl-0 font-medium">
              {order.item.name}
            </TableCell>
            <TableCell>${order.item.price}</TableCell>
            <TableCell className="text-center">x{order.quantity}</TableCell>
            <TableCell className="pr-0 text-right">
              ${order.item.price * order.quantity}
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="hover:bg-inherit">
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center font-medium">Total</TableCell>
          <TableCell className="pr-0 text-right text-base font-bold">
            ${total}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
