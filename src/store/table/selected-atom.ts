import { atom } from "jotai"

import { Table } from "@/types/entities/table"

const selectedTableAtom = atom<Table | null>(null)

export default selectedTableAtom
