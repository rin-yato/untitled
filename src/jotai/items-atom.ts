import { Item } from "@/drizzle/schema/items"
import { atom } from "jotai"

export const itemsAtom = atom<Array<Item>>([])
