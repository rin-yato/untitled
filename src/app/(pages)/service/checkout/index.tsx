import React, { useMemo } from "react"

import useSession from "@/hooks/use-session"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"

import { SummaryCard } from "./summary-card"

type Props = {
  children: React.ReactNode
}

export function CheckoutDialog({ children }: Props) {
  const { selectedSession } = useSession()

  const noOrders = useMemo(() => {
    return selectedSession?.orders.length === 0
  }, [selectedSession])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-fit">
        {noOrders ? (
          <div className="flex flex-col items-center justify-center gap-3 p-10">
            <Icons.banana size="52" />
            <Text variant="smallheading" className="">
              No order for this table.
            </Text>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Table {selectedSession?.table.number}</DialogTitle>
              <DialogDescription>
                {new Date().toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <SummaryCard />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
