import { atom } from "jotai"

import { Receipt } from "@/types/entities/receipt"

const receiptsAtom = atom<Array<Receipt>>([])

export default receiptsAtom
