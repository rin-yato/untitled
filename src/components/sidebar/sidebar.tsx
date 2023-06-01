"use client"

import React from "react"

import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"
import SidebarList from "@/components/sidebar/sidebar-list"

export default function Sidebar() {
  return (
    <div className="flex w-full min-w-fit max-w-[280px] flex-col border-r-2 px-5 py-9">
      <div className="clickable mb-10 flex cursor-default items-center gap-2 pl-2">
        <Icons.box className="text-emerald-500" size="32" />
        <Text variant="subheading">Untitled</Text>
      </div>
      <SidebarList />
    </div>
  )
}
