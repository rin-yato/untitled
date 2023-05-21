import React from "react"

export default function OrderItem() {
  return (
    <li className="clickable flex select-none items-center rounded-lg bg-secondary p-3">
      <div className="flex">
        <span className="grid h-6 w-6 place-content-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          1
        </span>
      </div>
    </li>
  )
}
