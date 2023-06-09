import { produce } from "immer"
import { atom, useAtom } from "jotai"
import { z } from "zod"

const createAlertSchema = z.object({
  open: z.boolean().default(true),
  title: z.string(),
  description: z.string().optional(),
  type: z
    .union([z.literal("default"), z.literal("destructive")])
    .default("default"),
  cancelText: z.string().default("Cancel"),
  confirmText: z.string().default("Confirm"),
  onConfirm: z.function().returns(z.promise(z.void()).or(z.void())).optional(),
  onCancel: z
    .function()
    .returns(z.void())
    .default(() => () => {}),
  resolve: z.function().returns(z.void()).optional(),
})

export type AlertAtom = z.infer<typeof createAlertSchema>

const alertAtom = atom<AlertAtom | null>(null)

export default function useAlert() {
  const [alert, setAlert] = useAtom(alertAtom)

  const createAlert = async (alert: z.input<typeof createAlertSchema>) => {
    await new Promise((resolve) => {
      const alertData = createAlertSchema.parse(
        produce(alert, (draft) => {
          draft.resolve = resolve
        })
      )
      setAlert(alertData)
    })
  }

  const showAlert = () => {
    if (!alert) return
    setAlert(
      produce(alert, (draft) => {
        draft.open = true
      })
    )
  }

  const hideAlert = () => {
    if (!alert) return
    setAlert(
      produce(alert, (draft) => {
        draft.open = false
      })
    )
  }

  return {
    alert,
    showAlert,
    hideAlert,
    createAlert,
  }
}
