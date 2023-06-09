"use client"

import React from "react"

import useAlert from "@/hooks/use-alert"
import {
  AlertDialogAction,
  AlertDialog as AlertDialogBase,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"

export default function AlertDialog() {
  const { alert, hideAlert } = useAlert()

  if (!alert) return null

  const handleConfirm = async () => {
    await alert.onConfirm?.()
    alert.resolve?.()
  }

  return (
    <AlertDialogBase open={alert.open} onOpenChange={hideAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alert.title}</AlertDialogTitle>
          <AlertDialogDescription>{alert.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={alert.onCancel}>
            {alert.cancelText || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={buttonVariants({
              variant: alert.type,
            })}
          >
            {alert.confirmText || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogBase>
  )
}
