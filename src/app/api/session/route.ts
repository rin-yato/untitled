import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertSessionSchema, sessions } from "@/drizzle/schema/sessions"

export async function GET() {
  const data = await db.select().from(sessions)

  return NextResponse.json(data)
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
