import { create } from 'zustand'
import { Bolt, BoltVariants } from '@/types/types'

type BoltsStore = {
    bolts: Bolt[]
    setBolts: (bolts: Bolt[]) => void
}

export const useBoltsStore = create<BoltsStore>(set => ({
    bolts: [] as Bolt[],
    setBolts: (bolts: Bolt[]) => set({ bolts }),
}))

// ? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Variants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type BoltVariantsStore = {
    boltVariants: BoltVariants[]
    setBoltVariants: (boltVariants: BoltVariants[]) => void
}

export const useBoltVariantsStore = create<BoltVariantsStore>(set => ({
    boltVariants: [] as BoltVariants[],
    setBoltVariants: (boltVariants: BoltVariants[]) => set({ boltVariants }),
}))
