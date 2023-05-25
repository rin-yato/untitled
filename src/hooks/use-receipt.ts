import receiptsAtom from "@/jotai/receipt-atom"
import { useAtom } from "jotai"

import { Receipt } from "@/types/entities/receipt"

export default function useReceipt() {
  const [receipts, setReceipts] = useAtom(receiptsAtom)

  const addReceipt = (tableId: number) => {
    const mockReceipt: Receipt = {
      id: Math.random(),
      tableId,
      icons: [],
      orderedItems: [],
    }
    setReceipts([...receipts, mockReceipt])
  }

  const updateItem = (receiptId: number, itemId: number, quantity: number) => {
    const receipt = receipts.find((receipt) => receipt.id === receiptId)
    if (!receipt) return
    const item = receipt.orderedItems.find((item) => item.itemId === itemId)
    if (!item) return
    item.quantity = quantity
    setReceipts([...receipts])
  }

  return {
    receipts,
    addReceipt,
    updateItem,
  }
}
