import { atom } from "jotai"

import { CategoriesResponse } from "@/types/api/categories"

const categoriesAtom = atom<Array<CategoriesResponse>>([])

export default categoriesAtom
