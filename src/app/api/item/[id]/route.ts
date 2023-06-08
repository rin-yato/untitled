import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertItemSchema, items } from "@/drizzle/schema/items"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/types/utils"

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const body = await request.json()
  const updateItemData = insertItemSchema.partial().parse(body)
  const updatedItem = await db
    .update(items)
    .set(updateItemData)
    .where(eq(items.id, Number(params.id)))

  return NextResponse.json(updatedItem)
}

export async function DELETE(request: Request, { params }: ApiParams<"id">) {
  const deletedItem = await db
    .delete(items)
    .where(eq(items.id, Number(params.id)))

  return NextResponse.json(deletedItem)
}
