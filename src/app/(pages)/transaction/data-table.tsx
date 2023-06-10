"use client"

import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
} from "@/components/data-table"
import { DataTableFacetedFilter } from "@/components/data-table/faceted-filter"
import { DatePickerWithRange } from "@/components/date-picker"

import { status } from "./data"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TransactionDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex items-center gap-x-5 py-4">
        {table.getColumn("createdAt") && (
          <DatePickerWithRange
            onRangeChange={(date) => {
              table.getColumn("createdAt")?.setFilterValue([date.from, date.to])
            }}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            options={status}
            title="Status"
            column={table.getColumn("status")}
          />
        )}
        <DataTableViewOptions table={table} />
      </div>
      <DataTable table={table} columns={columns} data={data} />
      <div className="my-5" />
      <DataTablePagination table={table} />
    </div>
  )
}
