"use client"

import { Table } from "@/drizzle/schema/tables"
import { Close } from "@radix-ui/react-dialog"

import useTable from "@/hooks/use-table"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import Text from "@/components/ui/text"

export function PickTableDialog() {
  const { tables, closePickTable, pickTableData } = useTable()

  const isOpen = !!pickTableData

  const filteredTable = tables.filter(
    (table) => !pickTableData?.filter?.includes(table.id)
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closePickTable()}>
      <DialogContent className="dialog-no-close custom-scrollbar max-h-[70vh] w-[55vw] !max-w-none overflow-y-auto !rounded-2xl py-6 ">
        {filteredTable.length > 0 ? (
          <TableGrid
            filteredTable={filteredTable}
            onPickTable={(tableId) => pickTableData?.onPick(tableId)}
          />
        ) : (
          <EmptyTableState />
        )}
      </DialogContent>
    </Dialog>
  )
}

const TableGrid = ({
  filteredTable,
  onPickTable,
}: {
  filteredTable: Array<Table>
  onPickTable: (tableId: number) => void
}) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {filteredTable.map((table) => {
        return (
          <Close key={table.id} onClick={() => onPickTable(table.id)}>
            <div className="clickable cliche-card justify-between">
              <span className="flex flex-col items-start">
                <Text variant="subheading" className="dark:text-secondary">
                  Table {table.number}
                </Text>
              </span>
            </div>
          </Close>
        )
      })}
    </div>
  )
}

const EmptyTableState = () => (
  <div className="mx-auto flex aspect-square w-fit flex-col items-center justify-center space-y-2 text-muted-foreground">
    <Icons.armchair size="100" />
    <Text variant="subheading">No Table Available</Text>
  </div>
)
