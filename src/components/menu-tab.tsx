import React from "react"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import { Close } from "@radix-ui/react-dialog"
import { useAtom } from "jotai"

import { CategoriesResponse } from "@/types/api/categories"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Text from "@/components/ui/text"
import { DynamicIcon } from "@/components/icons"

import useOrder from "../hooks/use-order"

type Props = {
  categories: Array<CategoriesResponse>
}

export default function MenuTab({ categories }: Props) {
  const { createOrder } = useOrder()
  const [selectedSession] = useAtom(selectedSessionAtom)

  const allOrderedItemIds = selectedSession?.orders.map(
    (order) => order.item.id
  )

  return (
    <Tabs defaultValue={categories[0].id}>
      <TabsList className="h-fit w-fit p-1.5 dark:bg-accent">
        {categories.map((category, index) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="dark:data-[state='active']:bg-complementary dark:data-[state='active']:text-primary"
          >
            <div className="flex items-center justify-center gap-2 px-2 py-1">
              {category.icon && <DynamicIcon name={category.icon} size="18" />}
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
              <Close>
                <button
                  key={menu.id}
                  disabled={allOrderedItemIds?.includes(menu.id)}
                  onClick={() => createOrder(menu.id)}
                  className="enabled:clickable  cliche-card p-3 disabled:grayscale"
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
                </button>
              </Close>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
