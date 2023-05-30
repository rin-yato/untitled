import useSwr from "swr"

import { CategoriesResponse } from "@/types/api/categories"
import { fetcher } from "@/lib/utils"

export default function useCategory() {
  const { data } = useSwr<Array<CategoriesResponse>>("/api/category", fetcher)

  return {
    categories: data || [],
  }
}
