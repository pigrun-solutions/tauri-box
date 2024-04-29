import { create } from 'zustand'
import { Vent } from '@/types/types'

type VentStore = {
    vents: Vent[]
    setVents: (vents: Vent[]) => void
}

export const useVentsStore = create<VentStore>(set => ({
    vents: [] as Vent[],
    setVents: (vents: Vent[]) => set({ vents }),
}))
