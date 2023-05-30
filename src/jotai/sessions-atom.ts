import { atom } from "jotai"

import { SessionsResponse } from "@/types/api/sessions"

export const sessionsAtom = atom<Array<SessionsResponse>>([])
