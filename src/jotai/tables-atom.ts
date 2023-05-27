import { Table } from "@/drizzle/schema/tables"
import { atom } from "jotai"

const tablesAtom = atom<Array<Table>>([])

export default tablesAtom
