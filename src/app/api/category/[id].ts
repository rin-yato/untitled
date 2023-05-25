import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { categories, insertCategorySchema } from "@/drizzle/schema/categories"
import { eq } from "drizzle-orm"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const updateCategoryData = insertCategorySchema.partial().parse(body)
  const [updatedCategory] = await db
    .update(categories)
    .set(updateCategoryData)
    .where(eq(categories.id, params.id))
    .returning()

  return NextResponse.json(updatedCategory)
}

export async function DELETE({ params }: { params: { id: string } }) {
  const deletedCategory = await db
    .delete(categories)
    .where(eq(categories.id, params.id))
    .returning()

  return NextResponse.json(deletedCategory)
}
