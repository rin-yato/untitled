import { Icon } from "@/components/icons"
import { Category } from "@/drizzle/schema/categories"
import { Item } from "@/drizzle/schema/items"

export type CategoriesResponse = Category & {
  icon: Icon // override the icon type from the schema
  items: Array<Item>
}
