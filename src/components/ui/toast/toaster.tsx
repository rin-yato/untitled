"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast/toast"

import { DynamicIcon } from "../icons"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <div>
        {toasts.map(function ({
          id,
          title,
          icon,
          description,
          action,
          ...props
        }) {
          return (
            <Toast key={id} {...props}>
              <div className="flex items-start gap-2">
                {icon && <DynamicIcon name={icon} size="22" />}
                <div className="flex flex-col gap-1 pt-0.5">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
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
