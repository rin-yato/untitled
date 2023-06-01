"use client"

import React from "react"

import { TableOrder } from "@/components/table-order"

type Props = {
  children: React.ReactNode
}

export default function TableLayout({ children }: Props) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <TableOrder />
    </>
  )
}
