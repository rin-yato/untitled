import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertSessionSchema, sessions } from "@/drizzle/schema/sessions"

import { SessionsResponse } from "@/types/api/sessions"

export async function GET() {
  const data: Array<SessionsResponse> = await db.query.sessions.findMany({
    with: {
      table: true,
      orders: {
        with: {
          item: true,
        },
      },
    },
    orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
  })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

  const createSessionData = insertSessionSchema.parse(body)

  const createdSession = await db.insert(sessions).values(createSessionData)

  return NextResponse.json(createdSession)
}
