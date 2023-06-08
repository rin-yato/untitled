import axios from "axios"
import useSwr from "swr"
import { z } from "zod"

import { CategoriesResponse } from "@/types/api/categories"
import { fetcher } from "@/lib/utils"

import useAlert from "./use-alert"
import { useToast } from "./use-toast"

const CreateCategorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
})

type CreateCategoryData = z.infer<typeof CreateCategorySchema>

export default function useCategory() {
  const { data, mutate, isLoading } = useSwr<Array<CategoriesResponse>>(
    "/api/category",
    fetcher
  )
  const { createAlert } = useAlert()
  const { toast } = useToast()

  const createCategory = async (category: CreateCategoryData) => {
    const validatedData = CreateCategorySchema.parse(category)

    await axios.post("/api/category", validatedData)

    mutate()
  }

  const updateCategory = async (id: number, category: CreateCategoryData) => {
    const validatedData = CreateCategorySchema.parse(category)

    await axios.put(`/api/category/${id}`, validatedData)

    mutate()
  }

  const deleteCategory = async (id: number) => {
    await createAlert({
      title: "Delete Category",
      type: "destructive",
      description: "Are you sure you want to delete this category?",
      onConfirm: async () => {
        await axios.delete(`/api/category/${id}`)
      },
    })
    mutate()
    toast({
      title: "Category deleted successfully",
      variant: "success",
      icon: "success",
    })
  }

  return {
    categories: data || [],
    mutate,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
  }
}
