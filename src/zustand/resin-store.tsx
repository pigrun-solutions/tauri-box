import { create } from 'zustand'
import { Resin } from '@/types/types'

type ResinStore = {
    resin: Resin[]
    setResin: (resin: Resin[]) => void
}

export const useResinStore = create<ResinStore>(set => ({
    resin: [] as Resin[],
    setResin: (resin: Resin[]) => set({ resin }),
}))
