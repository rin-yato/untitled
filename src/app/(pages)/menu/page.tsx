"use client"

import React, { useEffect, useState } from "react"

import useCategory from "@/hooks/use-category"
import { Button } from "@/components/ui/button"
import { DynamicIcon, Icons } from "@/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Text from "@/components/ui/text"

import { MenuForm } from "./menu-form"
import { EditCategoryDialog } from "./menu-form/edit-category-dialog"
import EditItemDialog from "./menu-form/edit-item-dialog"

export default function MenuPage() {
  const { categories, isLoading } = useCategory()

  // this control the current category tab
  const [defaultCategory, setDefaultCategory] = useState<number>()

  useEffect(() => {
    // On first render, set the default category
    // to the first category in the list
    const currentDefaultCategory = categories[0]?.id

    // If there is already a default category,
    // don't change it
    setDefaultCategory((prev) => prev || currentDefaultCategory)
  }, [categories])

  if (isLoading) return <Text variant="subheading">Loading</Text>

  // If there are no categories,
  // show a message to create a category
  if (categories.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-y-5">
        <Text variant="smallheading">No Menu Items</Text>
        <EditCategoryDialog>
          <Button>Create a category</Button>
        </EditCategoryDialog>
      </div>
    )
  }

  return (
    <section className="flex-1 px-5 py-9">
      <Tabs
        value={defaultCategory?.toString()}
        onValueChange={(value) => setDefaultCategory(Number(value))}
      >
        <div className="flex w-fit items-center gap-2">
          <TabsList className="h-fit w-fit p-1.5 dark:bg-accent">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id.toString()}
                className="dark:data-[state='active']:bg-complementary dark:data-[state='active']:text-primary"
              >
                <div className="flex items-center justify-center gap-2 px-2 py-1">
                  {category.icon && (
                    <DynamicIcon name={category.icon} size="18" />
                  )}
                  <Text variant="caption">{category.name}</Text>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <EditCategoryDialog category={defaultCategory}>
            <Button
              variant="secondary"
              className="aspect-square h-full flex-1 bg-accent text-muted-foreground"
            >
              <Icons.edit2 size="22" />
            </Button>
          </EditCategoryDialog>
        </div>
        {categories.map((category) => (
          <TabsContent
            key={category.id + "tab-content"}
            value={category.id.toString()}
            className="mt-6 h-fit w-full"
          >
            <div className=" grid h-full w-full grid-cols-6 gap-5">
              {category.items.map((menu) => (
                <EditItemDialog
                  item={menu}
                  key={menu.id}
                  setDefaultCateogry={setDefaultCategory}
                >
                  <div className="clickable cliche-card p-3 ">
                    <Text
                      variant="smallheading"
                      className="text-start dark:text-secondary"
                    >
                      {menu.name}
                    </Text>
                    <Text
                      variant="caption"
                      className="ml-auto mt-auto dark:text-secondary"
                    >
                      ${menu.price}
                    </Text>
                  </div>
                </EditItemDialog>
              ))}
              <MenuForm setDefaultCateogry={setDefaultCategory} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
