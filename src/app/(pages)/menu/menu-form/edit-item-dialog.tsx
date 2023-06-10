import React from "react"
import { Item } from "@/drizzle/schema/items"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ItemForm } from "./item-form"

type Props = {
  setDefaultCateogry: React.Dispatch<React.SetStateAction<number | undefined>>
  item?: Item
  children?: React.ReactNode
}

export default function EditItemDialog({
  setDefaultCateogry,
  children,
  item,
}: Props) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xs">
        <DialogTitle>Edit Item</DialogTitle>
        <DialogDescription>
          Edit the details of your item here. You can also change the category
          of your item.
        </DialogDescription>
        <ItemForm
          defaultItem={item}
          setOpen={setOpen}
          setDefaultCategory={setDefaultCateogry}
        />
      </DialogContent>
    </Dialog>
  )
}
