import * as items from "@/drizzle/schema/items"
import * as orders from "@/drizzle/schema/orders"
import * as sessions from "@/drizzle/schema/sessions"
import * as tables from "@/drizzle/schema/tables"

import * as categories from "./categories"

const schema = { ...tables, ...categories, ...items, ...sessions, ...orders }

export default schema
