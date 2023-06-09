import { insertOrderSchema } from "@/drizzle/schema/orders"
import selectedSessionAtom from "@/jotai/selected-session-atom"
import axios from "axios"
import { useAtom } from "jotai"

import useAlert from "@/hooks/use-alert"
import useSession from "@/hooks/use-session"

export default function useOrder() {
  const [selectedSession, setSelectedSession] = useAtom(selectedSessionAtom)

  const { mutate: mutateSession } = useSession()

  const { createAlert } = useAlert()

  const calculateNewOrder = (orderId: number, quantity: number) => {
    if (!selectedSession) return

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

  const createOrder = async (itemId: number) => {
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

  const updateOrder = async (orderId: number, quantity: number) => {
    if (!selectedSession) return

    const updateOrderData = insertOrderSchema.partial().parse({
      quantity,
    })

    if (quantity === 0) {
      deleteOrder(orderId)
      return
    }

    calculateNewOrder(orderId, quantity)

    await axios.put(`/api/order/${orderId}`, updateOrderData)

    mutateSession()
  }

  const deleteOrder = async (orderId: number) => {
    if (!selectedSession) return

    createAlert({
      title: "Are you sure you want to delete this order?",
      description: "This action cannot be undone.",
      type: "destructive",
      onConfirm: () => {
        axios.delete(`/api/order/${orderId}`).then(() => mutateSession())
      },
    })
  }

  return { createOrder, updateOrder, deleteOrder }
}
