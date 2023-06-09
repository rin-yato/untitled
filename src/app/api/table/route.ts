import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertTableSchema, tables } from "@/drizzle/schema/tables"

export async function GET() {
  const data = await db.select().from(tables).orderBy(tables.number)

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const createTableData = insertTableSchema.parse(body)
  const createdTable = await db.insert(tables).values(createTableData)

  return NextResponse.json(createdTable)
}
