"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import useSession from "@/hooks/use-session"
import useTable from "@/hooks/use-table"
import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text"
import { TableCard } from "@/components/table-card"

export default function TablePage() {
  const { sessions, addSession, selectSession } = useSession()
  const { pickTable } = useTable()
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease",
  })

  const handlePickTable = () => {
    pickTable({
      onPick: (tableId) => {
        addSession(tableId)
      },
      filter: sessions.map((session) => session.table.id),
    })
  }

  return (
    <section className="flex min-h-screen flex-col items-start justify-start overflow-y-auto px-5 pb-10 pt-8">
      <Text
        variant="heading"
        className="mb-11 select-none underline underline-offset-4"
      >
        Table
      </Text>

      <div ref={parent} className="grid w-full grid-cols-4 gap-5">
        {sessions.map((session) => (
          <button key={session.id} onClick={() => selectSession(session)}>
            <TableCard number={session.table.number} />
          </button>
        ))}

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
