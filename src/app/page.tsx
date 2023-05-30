"use client"

import selectedSessionAtom from "@/jotai/selected-session-atom"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useAtom } from "jotai"

import { SessionsResponse } from "@/types/api/sessions"
import useSession from "@/hooks/use-session"
import Text from "@/components/ui/text"
import { PickTableDialog } from "@/components/dialog"
import { TableCard } from "@/components/table-card"

export default function IndexPage() {
  const { sessions, addSession } = useSession()
  const [, selectedSession] = useAtom(selectedSessionAtom)
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease",
  })

  const handleSessionClick = (session: SessionsResponse) => {
    selectedSession(session)
  }

  return (
    <section className="flex flex-1 flex-col items-start justify-start overflow-y-auto px-5 pb-10 pt-8">
      <Text
        variant="heading"
        className="mb-11 select-none underline underline-offset-4"
      >
        Table
      </Text>

      <div ref={parent} className="grid w-full grid-cols-4 gap-5">
        {sessions.map((session) => (
          <button key={session.id} onClick={() => handleSessionClick(session)}>
            <TableCard number={session.table.number} />
          </button>
        ))}
        <PickTableDialog
          filter={sessions.map((session) => session.table.id)}
          onPickTable={addSession}
        />
      </div>
    </section>
  )
}
