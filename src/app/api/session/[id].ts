import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { sessions } from "@/drizzle/schema/sessions"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/types/utils"

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const updateSessionData = await request.json()

  const updatedSession = await db
    .update(sessions)
    .set(updateSessionData)
    .where(eq(sessions.id, params.id))
    .returning()

  return NextResponse.json(updatedSession)
}

export async function DELETE({ params }: ApiParams<"id">) {
  const [deletedSession] = await db
    .delete(sessions)
    .where(eq(sessions.id, params.id))
    .returning()

  return NextResponse.json(deletedSession)
}
