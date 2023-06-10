import React from "react"
import { Category } from "@/drizzle/schema/categories"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CategoryForm } from "./category-form"

type Props = {
  category?: number
  children?: React.ReactNode
}

export function EditCategoryDialog({ category, children }: Props) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xs">
        <DialogTitle>
          {category ? "Edit Category" : "Create a new Category"}
        </DialogTitle>
        <DialogDescription>
          {category
            ? "Edit the details of your item here. You can also change the category of your item."
            : "Create a new Category to organize your menu."}
        </DialogDescription>
        <CategoryForm defaultCategory={category} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
