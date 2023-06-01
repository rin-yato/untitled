import { Icons } from "@/components/ui/icons"

type SidebarConfigType = {
  items: { label: string; icon: keyof typeof Icons; href: string }[]
}

export const sidebarConfig: SidebarConfigType = {
  items: [
    { label: "Table", icon: "armchair", href: "/table" },
    { label: "Takeout", icon: "packageOpen", href: "/takeout" },
    { label: "Menu", icon: "clipboardList", href: "/menu" },
    { label: "Transaction", icon: "dollarSign", href: "/transaction" },
    { label: "Accounting", icon: "calculator", href: "/accounting" },
  ],
}
