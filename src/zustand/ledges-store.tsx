import { create } from 'zustand'
import { Ledge } from '@/types/types'

type LedgeStore = {
    ledges: Ledge[]
    setLedges: (ledges: Ledge[]) => void
}

export const useLedgeStore = create<LedgeStore>(set => ({
    ledges: [] as Ledge[],
    setLedges: (ledges: Ledge[]) => set({ ledges }),
}))
