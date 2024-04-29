import { create } from 'zustand'
import { Laminate } from '@/types/types'

type LaminateStore = {
    laminates: Laminate[]
    setLaminates: (laminates: Laminate[]) => void
}

export const useLaminateStore = create<LaminateStore>(set => ({
    laminates: [] as Laminate[],
    setLaminates: (laminates: Laminate[]) => set({ laminates }),
}))
