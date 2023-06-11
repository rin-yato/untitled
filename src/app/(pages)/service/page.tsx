"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import useSession from "@/hooks/use-session"
import useTable from "@/hooks/use-table"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icons"
import Text from "@/components/ui/text"
import { TableCard } from "@/components/table-card"

export default function TablePage() {
  const { sessions, addSession, selectSession, confirmPayment } = useSession()
  const { pickTable } = useTable()
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease",
  })

  // TODO: Add a way to remove a session

  const handlePickTable = () => {
    pickTable({
      onPick: (tableId) => {
        addSession(tableId)
      },
      filter: sessions.map((session) => session.table.id),
    })
  }

  return (
    <section className="layout-padding flex min-h-screen flex-col items-start justify-start overflow-y-auto">
      <Text
        variant="heading"
        className="mb-11 select-none underline underline-offset-4"
      >
        Table
      </Text>

      <div ref={parent} className="grid w-full grid-cols-4 gap-5">
        {sessions.map((session) => {
          // Generate a list of icons for the table card
          const icons = session.orders.reduce((acc, order) => {
            const icon = order.item.category.icon || ""
            if (!acc.includes(icon)) {
              acc.push(icon)
            }
            return acc
          }, [] as string[])

          const isPending = session.status === "pending"

          return (
            <button
              key={session.tableId}
              onClick={() =>
                isPending ? confirmPayment(session.id) : selectSession(session)
              }
            >
              <TableCard
                number={session.table.number}
                icons={icons as Array<Icon>}
                isPending={isPending}
              />
            </button>
          )
        })}

        <Button
          size="xl"
          variant="accent"
          className="aspect-square h-fit w-full ring-emerald-500 hover:ring-1 dark:ring-emerald-100"
          onClick={handlePickTable}
        >
          Pick a Table
        </Button>
      </div>
    </section>
  )
}
