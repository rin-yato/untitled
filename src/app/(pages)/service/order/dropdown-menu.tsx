import React from "react"

import useSession from "@/hooks/use-session"
import useTable from "@/hooks/use-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"

export function OrderDropdownMenu() {
  const { deleteSession, sessions, updateSession } = useSession()
  const { pickTable } = useTable()

  const handleSelectTable = () => {
    pickTable({
      filter: sessions.map((session) => session.tableId),
      onPick: (tableId) => {
        updateSession(tableId)
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="xl"
          className="aspect-square rounded-full p-3"
        >
          <Icons.moreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-40">
        <DropdownMenuItem onClick={handleSelectTable}>
          <Icons.edit2 className="mr-2 h-5 w-5" />
          <span className="text-base">Edit Table</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem isDestructive onClick={deleteSession}>
          <Icons.trash className="mr-2 h-5 w-5" />
          <span className="text-base">Delete Table</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
