"use client"

import React from "react"

import useCategory from "@/hooks/use-category"
import { DynamicIcon } from "@/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Text from "@/components/ui/text"
import { MenuForm } from "@/components/menu-form"

export default function MenuPage() {
  const { categories } = useCategory()

  if (categories.length === 0) return <Text variant="subheading">Loading</Text>

  return (
    <section className="flex-1 px-5 py-9">
      <Tabs defaultValue={categories[0].id}>
        <TabsList className="h-fit w-fit p-1.5 dark:bg-accent">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
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
        {categories.map((category) => (
          <TabsContent
            key={category.id + "tab-content"}
            value={category.id}
            className="mt-6 h-fit w-full"
          >
            <div className=" grid h-full w-full grid-cols-6 gap-5">
              {category.items.map((menu) => (
                <button key={menu.id} className="clickable cliche-card p-3 ">
                  <Text variant="smallheading" className="dark:text-secondary">
                    {menu.name}
                  </Text>
                  <Text
                    variant="caption"
                    className="ml-auto mt-auto dark:text-secondary"
                  >
                    ${menu.price}
                  </Text>
                </button>
              ))}
              <MenuForm />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
