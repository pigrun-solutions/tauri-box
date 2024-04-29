import { create } from 'zustand'
import { SightGlasses, SightGlassVariants } from '@/types/types'

type SightGlassesStore = {
    sightGlasses: SightGlasses[]
    setSightGlasses: (sightGlasses: SightGlasses[]) => void
}

export const useSightGlassesStore = create<SightGlassesStore>(set => ({
    sightGlasses: [] as SightGlasses[],
    setSightGlasses: (sightGlasses: SightGlasses[]) => set({ sightGlasses }),
}))

// ? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Variants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type BoltVariantsStore = {
    sightGlassVariants: SightGlassVariants[]
    setSightGlassVariants: (sightGlassVariants: SightGlassVariants[]) => void
}

export const useSightGlassVariantsStore = create<BoltVariantsStore>(set => ({
    sightGlassVariants: [] as SightGlassVariants[],
    setSightGlassVariants: (sightGlassVariants: SightGlassVariants[]) => set({ sightGlassVariants }),
}))
