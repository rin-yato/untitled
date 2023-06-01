"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import IconConfig from "@/config/icon"
import useCategory from "@/hooks/use-category"
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

const CategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a name for your category",
    })
    .min(2, "Name must be at least 2 characters long"),
  icon: z.string().min(2, "Error icon picked").optional(),
})

type CategoryForm = z.infer<typeof CategoryFormSchema>

export default function CategoryForm() {
  const { createCategory } = useCategory()

  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
  })

  const onSubmit = (category: CategoryForm) => {
    createCategory(category)
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
                <Input placeholder="cateory name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon for your category" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {IconConfig.map(({ label, icon }) => (
                    <SelectItem value={icon}>
                      <span className="flex items-center gap-3">
                        <DynamicIcon name={icon} size="16" />
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
