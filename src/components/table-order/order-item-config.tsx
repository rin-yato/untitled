import React from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"


export default function OrderItemConfig() {
  return (
    <div className="mt-1 grid grid-flow-col gap-1 pt-2">
      <Button variant="secondary" className="hover-ring">+6</Button>
      <Button variant="secondary" className="hover-ring">+4</Button>
      <Button variant="secondary" className="hover-ring">+2</Button>
      <Button variant="secondary" className="hover-ring">more</Button>
      <Button variant="destructive">
        <Icons.trash size="20" />
      </Button>
    </div>
  )
}
