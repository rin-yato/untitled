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
  onConfirm: z.function().returns(z.void()),
  onCancel: z
    .function()
    .returns(z.void())
    .default(() => () => {}),
})

export type AlertAtom = z.infer<typeof createAlertSchema>

const alertAtom = atom<AlertAtom | null>(null)

export default function useAlert() {
  const [alert, setAlert] = useAtom(alertAtom)

  const createAlert = (alert: z.input<typeof createAlertSchema>) => {
    const alertData = createAlertSchema.parse(alert)
    setAlert(alertData)
  }

  const showAlert = () => {
    if (!alert) return
    setAlert({ ...alert, open: true })
  }

  const hideAlert = () => {
    if (!alert) return
    setAlert({ ...alert, open: false })
  }

  return {
    alert,
    showAlert,
    hideAlert,
    createAlert,
  }
}
