import { Card, CardContent } from "@/components/ui/card"
import useSession from "@/hooks/use-session"
import { cn } from "@/lib/utils"
import React from "react"
import { ItemTable } from "./item-table"
import { Close } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"

export function SummaryCard() {
  const { checkout } = useSession()
  return (
    <Card className={cn("w-max min-w-[27rem] max-w-xl border-none")}>
      <CardContent className="flex !max-h-fit flex-col p-0 pt-5">
        <ItemTable />
        <Close asChild>
          <Button className="mt-5 block" onClick={checkout}>
            Confirm Checkout
          </Button>
        </Close>
      </CardContent>
    </Card>
  )
}
