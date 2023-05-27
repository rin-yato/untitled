import { SessionsResponse } from "@/lib/types/api/sessions"
import { atom } from "jotai"

export const sessionsAtom = atom<Array<SessionsResponse>>([])
