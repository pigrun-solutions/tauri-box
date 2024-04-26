import { create } from 'zustand'
import { Glass } from '@/types/types'

type GlassesStore = {
    glasses: Glass[]
    setGlasses: (glasses: Glass[]) => void
}

export const useGlassesStore = create<GlassesStore>(set => ({
    glasses: [] as Glass[],
    setGlasses: (glasses: Glass[]) => set({ glasses }),
}))
