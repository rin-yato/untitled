import React from "react"

import SidebarItem from "@/components/sidebar/sidebar-item"
import { sidebarConfig } from "@/config/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SidebarList() {
  return (
    <div className="flex flex-1 select-none flex-col justify-between">
      <div className="upper flex flex-1 flex-col gap-2">
        {sidebarConfig.items.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
      <div className="footer">
        <ThemeToggle />
        <SidebarItem icon="settings" label="Settings" />
      </div>
    </div>
  )
}
