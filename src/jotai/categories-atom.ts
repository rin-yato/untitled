import { Category } from "@/drizzle/schema/categories"
import { atom } from "jotai"

const categoriesAtom = atom<Array<Category>>([])

export default categoriesAtom
