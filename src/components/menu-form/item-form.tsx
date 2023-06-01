"use client"

import React from "react"
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
import { DynamicIcon } from "@/components/ui/icons"
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
  categoryId: z.string({
    required_error: "Please select a category for your item",
  }),
})

type ItemForm = z.infer<typeof ItemFormSchema>

export default function ItemForm() {
  const { createItem } = useItem()
  const { categories } = useCategory()

  const form = useForm<ItemForm>({
    resolver: zodResolver(ItemFormSchema),
  })

  const onSubmit = (item: ItemForm) => {
    const price = Number(item.price)
    createItem({ ...item, price })
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
                <Input placeholder="BBQ, soup, juices..." {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for your item" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id}>
                      <span className="flex items-center gap-3">
                        <DynamicIcon name={category.icon || "badgeX"} size="16" />
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
        <Button type="submit" className="!mt-10">
          Create Item
        </Button>
      </form>
    </Form>
  )
}
