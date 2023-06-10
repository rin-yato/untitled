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
import { DynamicIcon, Icons } from "@/components/ui/icons"
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

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  defaultCategory?: number
}

export function CategoryForm({ setOpen, defaultCategory }: Props) {
  const { createCategory, updateCategory, deleteCategory, categories } =
    useCategory()
  const [loading, setLoading] = React.useState(false)

  const category = categories.find((c) => c.id === defaultCategory)

  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: category?.name,
      icon: category?.icon,
    },
  })

  const onSubmit = async (category: CategoryForm) => {
    setLoading(true)
    if (defaultCategory) {
      // update existing category
      await updateCategory(defaultCategory, category)
    } else {
      // no default category, create a new one
      await createCategory(category)
    }
    setOpen(false)
  }

  const handleDeleteCategory = async () => {
    if (!defaultCategory) return
    await deleteCategory(defaultCategory)
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
                    <SelectItem value={icon} key={icon}>
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
        <div className="!mt-10 flex w-full justify-between">
          {defaultCategory && (
            <Button
              type="button"
              variant="destructiveOutline"
              className="group"
              onClick={handleDeleteCategory}
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
            {defaultCategory ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
