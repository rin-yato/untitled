import { atom } from "jotai"

import { Category } from "@/types/entities/category"

const categoriesAtom = atom<Array<Category>>([])

export default categoriesAtom
