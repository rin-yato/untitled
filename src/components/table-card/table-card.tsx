import React from "react"

import Text from "@/components/ui/text"
import { DynamicIcon, Icon } from "@/components/icons"

const foodIcons: Icon[] = ["beef", "beer", "soup"]

type Props = {
  id: number
}

export default function TableCard({ id }: Props) {
  return (
    <div className="clickable cliche-card justify-between">
      <div className="flex gap-3">
        {foodIcons.map((icon) => (
          <DynamicIcon name={icon} className="text-complementary-foreground" />
        ))}
      </div>
      <span className="flex flex-col items-start">
        <Text variant="subheading" className="dark:text-secondary">
          Table {id}
        </Text>
        <Text variant="caption" className="pl-1 text-muted-foreground">
          6 items
        </Text>
      </span>
    </div>
  )
}
