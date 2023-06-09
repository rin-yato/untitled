import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { categories, insertCategorySchema } from "@/drizzle/schema/categories"

import { CategoriesResponse } from "@/types/api/categories"

export async function GET() {
  const data = await db.query.categories.findMany({
    with: {
      items: true,
    },
  })

  return NextResponse.json(data as Array<CategoriesResponse>)
}

export async function POST(request: Request) {
  const body = await request.json()

  const createCategoryData = insertCategorySchema.parse(body)

  await db.insert(categories).values(createCategoryData)

  return NextResponse.json({ message: "Category created" })
}
