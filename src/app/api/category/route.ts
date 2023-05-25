import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { categories, insertCategorySchema } from "@/drizzle/schema/categories"

export async function GET() {
  const data = await db.select().from(categories)

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

  const createCategoryData = insertCategorySchema.parse(body)

  const [createdCategory] = await db
    .insert(categories)
    .values(createCategoryData)
    .returning()

  return NextResponse.json(createdCategory)
}
