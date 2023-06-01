import { Category } from "@/drizzle/schema/categories"
import { Item } from "@/drizzle/schema/items"

import { Icon } from "@/components/ui/icons"

export type CategoriesResponse = Category & {
  icon: Icon // override the icon type from the schema
  items: Array<Item>
}
