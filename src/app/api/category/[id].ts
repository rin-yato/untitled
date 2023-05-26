import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { categories, insertCategorySchema } from "@/drizzle/schema/categories"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/types/utils"

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const body = await request.json()
  const updateCategoryData = insertCategorySchema.partial().parse(body)
  const [updatedCategory] = await db
    .update(categories)
    .set(updateCategoryData)
    .where(eq(categories.id, params.id))
    .returning()

  return NextResponse.json(updatedCategory)
}

export async function DELETE({ params }: ApiParams<"id">) {
  const deletedCategory = await db
    .delete(categories)
    .where(eq(categories.id, params.id))
    .returning()

  return NextResponse.json(deletedCategory)
}
