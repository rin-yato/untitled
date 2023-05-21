import React from "react"

import { cn } from "@/lib/utils"
import Text from "@/components/ui/text"
import { Icons } from "@/components/icons"
import SidebarList from "@/components/sidebar/sidebar-list"

export default function Sidebar() {
  return (
    <div className="flex min-w-[20vw] flex-col border-r-2 px-5 py-9">
      <div className="clickable mb-10 flex cursor-default items-center gap-2 pl-2">
        <Icons.box className="text-emerald-500" size="32" />
        <Text variant="subheading">Untitled</Text>
      </div>
      <SidebarList />
    </div>
  )
}
