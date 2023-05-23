import { Item } from "@/types/entities/item"
import { Icon } from "@/components/icons"

export type Receipt = {
  id: number
  tableId: number
  icons: Array<string>
  orderedItems: Array<{ itemId: number; quantity: number }>
}
