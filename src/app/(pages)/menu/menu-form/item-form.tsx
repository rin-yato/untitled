"use client"

import React from "react"
import { Item } from "@/drizzle/schema/items"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import useCategory from "@/hooks/use-category"
import useItem from "@/hooks/use-item"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DynamicIcon, Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ItemFormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a name for your item",
    })
    .min(2, "Name must be at least 2 characters long"),
  price: z.string({
    required_error: "Please enter a price for your item",
  }),
  categoryId: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number({
      required_error: "Please select a category for your item",
    })
  ),
})

type ItemForm = z.infer<typeof ItemFormSchema>

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDefaultCategory: React.Dispatch<React.SetStateAction<number | undefined>>
  defaultItem?: Item
}

export function ItemForm({ setOpen, setDefaultCategory, defaultItem }: Props) {
  const { createItem, updateItem, deleteItem } = useItem()
  const { categories } = useCategory()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<ItemForm>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      name: defaultItem?.name,
      price: defaultItem?.price.toString(),
      categoryId: defaultItem?.categoryId,
    },
  })

  const onSubmit = async (item: ItemForm) => {
    if (defaultItem) {
      handleUpdateItem(defaultItem.id, item)
    } else {
      handleCreateItem(item)
    }
  }

  const handleCreateItem = (item: ItemForm) => {
    const price = Number(item.price)
    setLoading(true)
    createItem({ ...item, price })
    setDefaultCategory(item.categoryId)
    setOpen(false)
  }

  const handleUpdateItem = (id: number, item: ItemForm) => {
    const price = Number(item.price)
    updateItem(id, { ...item, price })
    setOpen(false)
  }

  const handleDeleteItem = async () => {
    if (!defaultItem) return
    await deleteItem(defaultItem.id)
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="BBQ, soup, juices..."
                  {...field}
                  autoComplete="off"
                  spellCheck={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for your item" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id?.toString()}
                    >
                      <span className="flex items-center gap-3">
                        <DynamicIcon
                          name={category.icon || "badgeX"}
                          size="16"
                        />
                        {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="$$" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="!mt-10 flex justify-between">
          {defaultItem && (
            <Button
              onClick={handleDeleteItem}
              type="button"
              variant="destructiveOutline"
              className="group"
            >
              <Icons.trash className="mr-2 " size="16" />
              Delete
            </Button>
          )}
          <Button type="submit" className="group" disabled={loading}>
            <Icons.loader
              className="mr-2 hidden animate-spin group-disabled:block"
              size="16"
            />
            {defaultItem ? "Save Change" : "Create Item"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
