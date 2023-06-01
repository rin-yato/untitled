import axios from "axios"
import useSwr from "swr"
import { z } from "zod"

import { CategoriesResponse } from "@/types/api/categories"
import { fetcher } from "@/lib/utils"

const CreateCategorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
})

type CreateCategoryData = z.infer<typeof CreateCategorySchema>

export default function useCategory() {
  const { data, mutate } = useSwr<Array<CategoriesResponse>>(
    "/api/category",
    fetcher
  )

  const createCategory = async (category: CreateCategoryData) => {
    const validatedData = CreateCategorySchema.parse(category)

    await axios.post("/api/category", validatedData)

    mutate()
  }
  return {
    categories: data || [],
    mutate,
    createCategory,
  }
}
