import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { tables } from "@/drizzle/schema/tables"

export async function GET() {
  const data = await db.select().from(tables)
  return NextResponse.json(data)
}

export async function POST() {
  const newTable = await db.insert(tables).values({
    number: 1,
  })
  return NextResponse.json(newTable)
}
