import { insertOrderSchema } from "@/drizzle/schema/orders"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import axios from "axios"
import { useAtom } from "jotai"

import useSession from "@/hooks/use-session"

export default function useOrder() {
  const [selectedSession, setSelectedSession] = useAtom(selectedSessionAtom)

  const { mutate: mutateSession } = useSession()

  const calculateNewOrder = (orderId: string, quantity: number) => {
    if (!selectedSession) return

    if (quantity === 0) {
      deleteOrder(orderId)
      return
    }

    const newOrders = selectedSession.orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, quantity }
      }
      return order
    })

    setSelectedSession({
      ...selectedSession,
      orders: newOrders,
    })
  }

  const createOrder = async (itemId: string) => {
    if (!selectedSession) return

    // Parse data to match schema
    const createOrderData = insertOrderSchema.parse({
      itemId,
      sessionId: selectedSession.id,
      quantity: 1, // Default to quantity of 1
    })

    // Send data to database
    await axios.post("/api/order", createOrderData)

    mutateSession()
  }

  const updateOrder = async (orderId: string, quantity: number) => {
    if (!selectedSession) return

    const updateOrderData = insertOrderSchema.partial().parse({
      quantity,
    })

    calculateNewOrder(orderId, quantity)

    await axios.put(`/api/order/${orderId}`, updateOrderData)

    mutateSession()
  }

  const deleteOrder = async (orderId: string) => {
    if (!selectedSession) return

    setSelectedSession(null)

    await axios.delete(`/api/order/${orderId}`)

    mutateSession()
  }

  return { createOrder, updateOrder, deleteOrder }
}
