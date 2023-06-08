import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"

type Props = {
  label: string
  icon: keyof typeof Icons
  href: string
}

export default function SidebarItem({ label, icon, href }: Props) {
  const pathname = usePathname()
  const Icon = Icons[icon]

  const isActive = href === pathname

  const activeTw = isActive && "bg-accent text-black dark:text-white"

  return (
    <Link href={href} className={cn("clickable-styled", activeTw)}>
      <Icon size="20" />
      <Text variant="caption"> {label}</Text>
    </Link>
  )
}
