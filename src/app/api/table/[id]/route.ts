import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertTableSchema, tables } from "@/drizzle/schema/tables"
import { eq } from "drizzle-orm"

import { ApiParams } from "@/types/utils"

export async function PUT(request: Request, { params }: ApiParams<"id">) {
  const body = await request.json()
  const updateTableData = insertTableSchema.partial().parse(body)
  const updatedTable = await db
    .update(tables)
    .set(updateTableData)
    .where(eq(tables.id, Number(params.id)))

  return NextResponse.json(updatedTable)
}

export async function DELETE(request: Request, { params }: ApiParams<"id">) {
  const deletedTable = await db
    .delete(tables)
    .where(eq(tables.id, Number(params.id)))

  return NextResponse.json(deletedTable)
}
