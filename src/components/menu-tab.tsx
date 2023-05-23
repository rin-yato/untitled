import React from "react"
import { Category } from "@/db"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Text from "@/components/ui/text"
import { DynamicIcon } from "@/components/icons"

type Props = {
  categories: Array<Category>
}

export default function MenuTab({ categories }: Props) {
  return (
    <Tabs defaultValue={categories[0].name}>
      <TabsList className="h-fit w-fit p-1.5 dark:bg-accent">
        {categories.map((category, index) => (
          <TabsTrigger
            key={category.name + index}
            value={category.name}
            className="dark:data-[state='active']:bg-complementary dark:data-[state='active']:text-primary"
          >
            <div className="flex items-center justify-center gap-2 px-2 py-1">
              <DynamicIcon name={category.icon} size="18" />
              <Text variant="caption">{category.name}</Text>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category, index) => (
        <TabsContent
          key={category.name + index}
          value={category.name}
          className=" mt-6 h-fit w-full"
        >
          <div className=" grid h-full w-full grid-cols-6 gap-5">
            {category.items.map((menu, index) => (
              <div
                key={menu.name + index}
                className="clickable cliche-card p-3"
              >
                <Text variant="smallheading" className="dark:text-secondary">
                  {menu.name}
                </Text>
                <Text
                  variant="caption"
                  className="ml-auto mt-auto text-muted-foreground"
                >
                  ${menu.price}
                </Text>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
