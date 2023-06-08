import { Item } from "@/drizzle/schema/items"
import axios from "axios"
import { produce } from "immer"
import useSwr from "swr"
import { z } from "zod"

import { fetcher } from "@/lib/utils"
import useCategory from "@/hooks/use-category"
import { useToast } from "@/hooks/use-toast"

import useAlert from "./use-alert"

const CreateItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  categoryId: z.number(),
})

type CreateItemData = z.infer<typeof CreateItemSchema>

export default function useItem() {
  const { data } = useSwr<Array<Item>>("/api/item", fetcher)
  const { mutate: mutateCategory, categories } = useCategory()
  const { toast } = useToast()
  const { createAlert } = useAlert()

  const createItem = (item: CreateItemData) => {
    const validatedData = CreateItemSchema.parse(item)

    const optimisticData = produce(categories, (draft) => {
      draft.forEach((category) => {
        if (category.id === validatedData.categoryId) {
          category.items.push({
            id: Math.floor(Math.random() * 100_000),
            name: validatedData.name,
            price: validatedData.price,
            categoryId: validatedData.categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      })
    })

    mutateCategory(optimisticData, false)

    toast({
      title: "Item created successfully",
      variant: "success",
      icon: "success",
    })

    axios.post("/api/item", validatedData).then(() => mutateCategory())
  }

  const updateItem = async (id: number, item: Partial<CreateItemData>) => {
    const validatedData = CreateItemSchema.partial().parse(item)

    await axios.put("/api/item/" + id, validatedData)

    mutateCategory()

    toast({
      variant: "success",
      icon: "success",
      title: "Item updated successfully",
    })
  }

  const deleteItem = async (id: number) => {
    await createAlert({
      title: "Delete Item",
      description: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      onConfirm: async () => {
        await axios.delete("/api/item/" + id)
      },
    })
    mutateCategory()
    toast({
      variant: "success",
      icon: "success",
      title: "Item deleted successfully",
    })
  }

  return {
    items: data || [],
    createItem,
    updateItem,
    deleteItem,
  }
}
