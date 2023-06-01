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

export default function TableOrderMenu() {
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

        <DropdownMenuItem
          className="hover:!bg-red-400/20"
          onClick={deleteSession}
        >
          <Icons.trash className="mr-2 h-5 w-5 text-red-500" />
          <span className="text-base text-red-500">Delete Table</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
