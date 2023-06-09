import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertItemSchema, items } from "@/drizzle/schema/items"

export async function GET() {
  const data = await db.select().from(items)

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

  const createItemData = insertItemSchema.parse(body)

  const createdItem = await db.insert(items).values(createItemData)

  return NextResponse.json(createdItem)
}
