import React from "react"

import Text from "@/components/ui/text"

import { Transaction, TransactionColumns } from "./columns"
import { TransactionDataTable } from "./data-table"

const fakeTransactions: Array<Transaction> = [
  {
    id: "1",
    tableNumber: 2,
    amountUsd: 100,
    amountKhr: 400000,
    status: "paid",
    createdAt: new Date(),
  },
  {
    id: "2",
    tableNumber: 3,
    amountUsd: 200,
    amountKhr: 800000,
    status: "waiting",
    createdAt: new Date(),
  },
  {
    id: "3",
    tableNumber: 4,
    amountUsd: 300,
    amountKhr: 1200000,
    status: "cancelled",
    createdAt: new Date(),
  },
  {
    id: "4",
    tableNumber: 5,
    amountUsd: 400,
    amountKhr: 1600000,
    status: "paid",
    createdAt: new Date(),
  },
  {
    id: "5",
    tableNumber: 6,
    amountUsd: 500,

    amountKhr: 2000000,
    status: "paid",
    createdAt: new Date(),
  },
]

export default function TransactionPage() {
  return (
    <section className="flex-1 px-5 py-8">
      <Text variant="heading" className="mb-11 underline underline-offset-4">
        Transaction
      </Text>
      <TransactionDataTable
        columns={TransactionColumns}
        data={fakeTransactions}
      />
    </section>
  )
}
