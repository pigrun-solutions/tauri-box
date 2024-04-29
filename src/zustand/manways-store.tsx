import { create } from 'zustand'
import { Manway, ManwayVariants } from '@/types/types'

type ManwayStore = {
    manways: Manway[]
    setManways: (manways: Manway[]) => void
}

export const useManwayStore = create<ManwayStore>(set => ({
    manways: [] as Manway[],
    setManways: (manways: Manway[]) => set({ manways }),
}))

// ? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Variants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type ManwayVariantsStore = {
    manwayVariants: ManwayVariants[]
    setManwayVariants: (manwayVariants: ManwayVariants[]) => void
}

export const useManwayVariantsStore = create<ManwayVariantsStore>(set => ({
    manwayVariants: [] as ManwayVariants[],
    setManwayVariants: (manwayVariants: ManwayVariants[]) => set({ manwayVariants }),
}))
