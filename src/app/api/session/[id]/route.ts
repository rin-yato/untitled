import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { orders, tables } from "@/drizzle/schema"
import { sessions } from "@/drizzle/schema/sessions"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/lib/types/utils"

export async function GET(request: Request, { params }: ApiParams<"id">) {
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, params.id))
    .innerJoin(tables, eq(sessions.tableId, tables.id))
    .leftJoin(orders, eq(sessions.id, orders.sessionId))

  return NextResponse.json(session)
}

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const updateSessionData = await request.json()

  const updatedSession = await db
    .update(sessions)
    .set(updateSessionData)
    .where(eq(sessions.id, params.id))
    .returning()

  return NextResponse.json(updatedSession)
}

export async function DELETE(request: Request, { params }: ApiParams<"id">) {
  const [deletedSession] = await db
    .delete(sessions)
    .where(eq(sessions.id, params.id))
    .returning()

  return NextResponse.json(deletedSession)
}
