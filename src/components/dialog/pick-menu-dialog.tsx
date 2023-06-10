"use client"

import React from "react"

import useCategory from "@/hooks/use-category"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import MenuTab from "@/app/(pages)/menu/menu-tab"

export default function PickMenuDialog() {
  const { categories } = useCategory()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" size="xl">
          <Icons.plus size="20" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="dialog-no-close custom-scrollbar h-[70vh] w-[65vw] !max-w-none overflow-y-auto !rounded-2xl py-6 ">
        <MenuTab categories={categories} />
      </DialogContent>
    </Dialog>
  )
}
