import React from "react"

import { DynamicIcon, Icon } from "@/components/ui/icons"
import Text from "@/components/ui/text"

const foodIcons: Icon[] = ["beef", "beer", "soup"]

type Props = {
  number: number
}

export default function TableCard({ number }: Props) {
  return (
    <div className="clickable cliche-card justify-between hover:dark:ring-4">
      <div className="flex gap-3">
        {foodIcons.map((icon) => (
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
