import React from "react"

import { cn } from "@/lib/utils"
import { DynamicIcon, Icon } from "@/components/ui/icons"
import Text from "@/components/ui/text"

type Props = {
  number: number
  isPending?: boolean
  icons?: Array<Icon>
}

export default function TableCard({ number, isPending, icons }: Props) {
  const isPendingClass = isPending && "bg-amber-200"

  return (
    <div
      className={cn(
        "clickable cliche-card justify-between hover:dark:ring-4",
        isPendingClass
      )}
    >
      <div className="flex gap-3">
        {icons?.map((icon) => (
          <DynamicIcon name={icon} className="text-complementary-foreground" />
        ))}
      </div>
      <span className="flex flex-col items-start">
        <Text variant="subheading" className="dark:text-secondary">
          Table {number}
        </Text>
        <Text variant="caption" className="pl-1 text-muted-foreground">
          6 items
        </Text>
      </span>
    </div>
  )
}
