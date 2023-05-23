import { atom } from "jotai"

import { Table } from "@/types/entities/table"

const tablesAtom = atom<Array<Table>>([])

export default tablesAtom
