"use client"

import React from "react"
import { categories } from "@/db"
import { Close } from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
import MenuTab from "@/components/menu-tab"

export default function PickMenuDialog() {
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
