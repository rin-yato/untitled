import { Icons } from "@/components/icons"

type SidebarConfigType = {
  items: { label: string; icon: keyof typeof Icons }[]
}

export const sidebarConfig: SidebarConfigType = {
  items: [
    { label: "Table", icon: "armchair" },
    { label: "Takeout", icon: "packageOpen" },
    { label: "Menu", icon: "clipboardList" },
    { label: "Transaction", icon: "dollarSign" },
    { label: "Accounting", icon: "calculator" },
  ],
}
