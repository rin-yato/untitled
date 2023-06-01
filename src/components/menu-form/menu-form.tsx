

import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import {  Icons } from "@/components/ui/icons"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {ItemForm } from "@/components/menu-form"
import {CategoryForm } from "@/components/menu-form"



export default function MenuForm() {
  return (
    <Dialog >
      <DialogTrigger>
        <button className="clickable cliche-card items-center justify-center bg-accent p-3 text-accent-foreground ">
          <Icons.plusCircle size="50" />
        </button>
      </DialogTrigger>
      <DialogContent className="dialog-no-close w-fit">
        <Tabs defaultValue="item" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="item">Item</TabsTrigger>
            <TabsTrigger value="category">Category</TabsTrigger>
          </TabsList>
          <TabsContent value="item">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle>Item</CardTitle>
                <CardDescription>
                  Create a new Item for your menu.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ItemForm/>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="category">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>
                  Create a new Category to organize your menu.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CategoryForm/>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
