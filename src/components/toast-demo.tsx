"use client"

import React from "react"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function ToastDemo() {
  const { toast } = useToast()

  const handleToast = () => {
    toast({
      title: "Hello",
      description: "This is a toast",
    })
  }

  return (
    <Button variant="outline" onClick={handleToast}>
      Toast
    </Button>
  )
}
