

// import { useEffect } from "react"
// import categoriesAtom from "@/jotai/categories-atom"
// import { useAtom } from "jotai"
import useSwr from "swr"

import { CategoriesResponse } from "@/types/api/categories"
import { fetcher } from "@/lib/utils"

export default function useCategory() {
  // const [categories, setCategories] = useAtom(categoriesAtom)

  const { data } = useSwr<Array<CategoriesResponse>>("/api/category", fetcher)

  // const fetchCategories = () => {
  //   fetch("/api/category").then((res) => {
  //     if (res.ok) {
  //       res.json().then((data) => {
  //         setCategories(data)
  //       })
  //     }
  //   })
  // }

  // useEffect(() => {
  //   fetchCategories()
  // }, [])

  return {
    categories: data || [],
  }
}
