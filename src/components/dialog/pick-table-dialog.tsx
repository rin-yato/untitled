"use client"

import { Close } from "@radix-ui/react-dialog"

import { Table } from "@/types/entities/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Text from "@/components/ui/text"

type Props = {
  onPickTable: (tableId: number) => void
  filter?: number[]
}

export function PickTableDialog({ onPickTable, filter }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="xl"
          variant="accent"
          className="aspect-square h-full w-full ring-emerald-500 hover:ring-1 dark:ring-emerald-100"
        >
          Pick a Table
        </Button>
      </DialogTrigger>
      <DialogContent className="dialog-no-close custom-scrollbar max-h-[70vh] w-[55vw] !max-w-none overflow-y-auto !rounded-2xl py-6 ">
        <div className="grid grid-cols-4 gap-5">
          {[...Array(18)].map((_, index) => {
            if (filter?.includes(index + 1)) return null
            return (
              <Close key={index} onClick={() => onPickTable(index + 1)}>
                <div className="clickable cliche-card justify-between">
                  <span className="flex flex-col items-start">
                    <Text variant="subheading" className="dark:text-secondary">
                      Table {index + 1}
                    </Text>
                  </span>
                </div>
              </Close>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
