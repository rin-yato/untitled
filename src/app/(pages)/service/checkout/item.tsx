import React from "react"

import Text from "@/components/ui/text"

export function CheckoutItem() {
  return (
    <div className="grid grid-flow-col gap-12 text-center">
      <Text variant="caption" className="text-start">
        Mixed Meat
      </Text>
      <Text>$7.5</Text>
      <Text>x2</Text>
      <Text>$1500000</Text>
    </div>
  )
}
