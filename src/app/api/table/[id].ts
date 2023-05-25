import { NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { insertTableSchema, tables } from "@/drizzle/schema/tables"
import { eq } from "drizzle-orm"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const updateTableData = insertTableSchema.partial().parse(body)
  const [updatedTable] = await db
    .update(tables)
    .set(updateTableData)
    .where(eq(tables.id, params.id))
    .returning()

  return NextResponse.json(updatedTable)
}

export async function DELETE({ params }: { params: { id: string } }) {
  const deletedTable = await db
    .delete(tables)
    .where(eq(tables.id, params.id))
    .returning()

  return NextResponse.json(deletedTable)
}
