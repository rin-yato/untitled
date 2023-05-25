import { NextApiResponse } from "next"
import { db } from "@/drizzle/db1"
import { tables } from "@/drizzle/schema/tables"

export default async function handler(req: any, res: NextApiResponse) {
  const data = await db.select().from(tables)
  console.log(data)
  res.json({ hello: "world" })
}
