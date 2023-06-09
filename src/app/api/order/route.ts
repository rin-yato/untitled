import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertOrderSchema, orders } from "@/drizzle/schema/orders"

export async function GET() {
  const data = await db.select().from(orders)

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

  const createOrderData = insertOrderSchema.parse(body)

  const createdOrder = await db.insert(orders).values(createOrderData)

  return NextResponse.json(createdOrder)
}
