"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast/toast"

export function Toaster() {
  const { toasts } = useToast()
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease",
  })

  return (
    <ToastProvider>
      <div ref={parent}>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        })}
      </div>

      <ToastViewport />
    </ToastProvider>
  )
}
