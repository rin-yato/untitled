import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { categories, insertCategorySchema } from "@/drizzle/schema/categories"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/types/utils"

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const body = await request.json()
  const updateCategoryData = insertCategorySchema.partial().parse(body)
  await db
    .update(categories)
    .set(updateCategoryData)
    .where(eq(categories.id, Number(params.id)))

  return NextResponse.json({ message: "Category updated" })
}

export async function DELETE(request: Request, { params }: ApiParams<"id">) {
  await db.delete(categories).where(eq(categories.id, Number(params.id)))

  return NextResponse.json({ message: "Category deleted" })
}
