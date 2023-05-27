import { Item } from "@/drizzle/schema/items"
import { Order } from "@/drizzle/schema/orders"
import { Session } from "@/drizzle/schema/sessions"
import { Table } from "@/drizzle/schema/tables"

export type SessionsResponse = Session & {
  table: Table
  orders: Array<OrderWithItem>
}

export type OrderWithItem = Order & { item: Item }
