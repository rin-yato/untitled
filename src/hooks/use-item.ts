import { Item } from "@/drizzle/schema/items"
import axios from "axios"
import useSwr from "swr"
import { z } from "zod"

import { fetcher } from "@/lib/utils"
import useCategory from "@/hooks/use-category"

const CreateItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  categoryId: z.string(),
})

type CreateItemData = z.infer<typeof CreateItemSchema>

export default function useItem() {
  const { data } = useSwr<Array<Item>>("/api/item", fetcher)
  const { mutate } = useCategory()

  const createItem = async (item: CreateItemData) => {
    const validatedData = CreateItemSchema.parse(item)

    await axios.post("/api/item", validatedData)

    mutate()
  }

  return {
    items: data || [],
    createItem,
  }
}
