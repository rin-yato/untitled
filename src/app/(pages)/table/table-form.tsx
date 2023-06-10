"use client"

import React from "react"
import { Table } from "@/drizzle/schema/tables"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { DisclosureHandlers } from "@/types/mantine-hook"
import useTable from "@/hooks/use-table"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"

const TableFormSchema = z.object({
  number: z.preprocess(Number, z.number()),
})

type TableForm = z.infer<typeof TableFormSchema>

type Props = {
  handlers: DisclosureHandlers
  defaultTable?: Table
}

export default function TableForm({ handlers, defaultTable }: Props) {
  const [loading, setLoading] = React.useState(false)
  const { tables, createTable, updateTable, deleteTable } = useTable()

  const form = useForm<TableForm>({
    resolver: zodResolver(TableFormSchema),
    defaultValues: {
      number: defaultTable?.number,
    },
  })

  const onSubmit = async (table: TableForm) => {
    if (defaultTable) {
      await handleUpdateTable(table)
    } else {
      await handleCreateTable(table)
    }
  }

  const tableExists = (number: number) => {
    return tables.some((table) => table.number === number)
  }

  const handleCreateTable = async (table: TableForm) => {
    setLoading(true)

    if (tableExists(table.number)) {
      setLoading(false)
      return form.setError("number", {
        type: "manual",
        message: `Table number ${table.number} already exists`,
      })
    }

    await createTable(table.number)
    setLoading(false)
    handlers.close()
  }

  const handleDeleteTable = async () => {
    if (!defaultTable) return
    await deleteTable(defaultTable!.id)
    handlers.close()
  }

  const handleUpdateTable = async (table: TableForm) => {
    if (!defaultTable) return
    setLoading(true)
    await updateTable(defaultTable!.id, table.number)
    setLoading(false)
    handlers.close()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit space-y-5">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Table Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter a number for your table"
                  {...field}
                  autoComplete="off"
                  spellCheck={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="!mt-10 flex justify-between">
          {defaultTable && (
            <Button
              onClick={handleDeleteTable}
              type="button"
              variant="destructiveOutline"
              className="group"
            >
              <Icons.trash className="mr-2 " size="16" />
              Delete
            </Button>
          )}
          <Button type="submit" className="group" disabled={loading}>
            <Icons.loader
              className="mr-2 hidden animate-spin group-disabled:block"
              size="16"
            />
            {defaultTable ? "Save Change" : "Create Table"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
