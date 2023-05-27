import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { orders } from "@/drizzle/schema/orders"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/lib/types/utils"

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const updateOrderData = await request.json()

  const [updatedOrder] = await db
    .update(orders)
    .set(updateOrderData)
    .where(eq(orders.id, params.id))
    .returning()

  return NextResponse.json(updatedOrder)
}

export async function DELETE({ params }: ApiParams<"id">) {
  const [deletedOrder] = await db
    .delete(orders)
    .where(eq(orders.id, params.id))
    .returning()

  return NextResponse.json(deletedOrder)
}
