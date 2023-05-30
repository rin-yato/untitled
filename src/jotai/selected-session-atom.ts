import { atom } from "jotai"

import { SessionsResponse } from "@/types/api/sessions"

const selectedSessionAtom = atom<SessionsResponse | null>(null)

export default selectedSessionAtom
