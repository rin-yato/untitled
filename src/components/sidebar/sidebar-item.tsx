import React from "react"

import { cn } from "@/lib/utils"
import Text from "@/components/ui/text"
import { Icons } from "@/components/icons"

type Props = {
  label: string
  icon: keyof typeof Icons
}

export default function SidebarItem({ label, icon }: Props) {
  const Icon = Icons[icon]
  return (
    <div className="clickable-styled">
      <Icon size="20" />
      <Text variant="caption"> {label}</Text>
    </div>
  )
}
