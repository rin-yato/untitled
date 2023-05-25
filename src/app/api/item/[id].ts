import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertItemSchema, items } from "@/drizzle/schema/items"
import { eq } from "drizzle-orm"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const updateItemData = insertItemSchema.partial().parse(body)
  const [updatedItem] = await db
    .update(items)
    .set(updateItemData)
    .where(eq(items.id, params.id))
    .returning()

  return NextResponse.json(updatedItem)
}

export async function DELETE({ params }: { params: { id: string } }) {
  const deletedItem = await db
    .delete(items)
    .where(eq(items.id, params.id))
    .returning()

  return NextResponse.json(deletedItem)
}
