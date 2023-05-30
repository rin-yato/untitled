

import { useEffect } from "react"
import { itemsAtom } from "@/jotai/items-atom"
import { useAtom } from "jotai"

export default function useItem() {
  const [items, setItems] = useAtom(itemsAtom)

  function fetchItems() {
    fetch("/api/item").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setItems(data)
        })
      }
    })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return {
    items,
    fetchItems,
  }
}
