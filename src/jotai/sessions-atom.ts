import { atom } from "jotai"

import { SessionsResponse } from "@/lib/types/api/sessions"

export const sessionsAtom = atom<Array<SessionsResponse>>([])
