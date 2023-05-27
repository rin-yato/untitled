import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { items } from "@/drizzle/schema"
import { orders } from "@/drizzle/schema/orders"
import { insertSessionSchema, sessions } from "@/drizzle/schema/sessions"
import { tables } from "@/drizzle/schema/tables"
import { eq } from "drizzle-orm"

import { SessionsResponse } from "@/lib/types/api/sessions"

export async function GET() {
  const data = await db
    .select()
    .from(sessions)
    .innerJoin(tables, eq(sessions.tableId, tables.id))
    .leftJoin(orders, eq(sessions.id, orders.sessionId))
    .leftJoin(items, eq(orders.itemId, items.id))

  const result = data.reduce<Array<SessionsResponse>>((acc, data) => {
    const session = data.sessions
    const table = data.tables
    const order = data.orders
    const item = data.items

    const existingSession = acc.find((s) => s.id === session.id)

    if (existingSession) {
      order && item && existingSession.orders.push({ ...order, item })
    } else {
      acc.push({
        ...session,
        table: table,
        orders: order && item ? [{ ...order, item }] : [],
      })
    }

    return acc
  }, [])

  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const body = await request.json()

  const createSessionData = insertSessionSchema.parse(body)

  const [createdSession] = await db
    .insert(sessions)
    .values(createSessionData)
    .returning()

  return NextResponse.json(createdSession)
}
