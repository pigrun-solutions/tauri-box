import { create } from 'zustand'
import { Nozzle, NozzleVariants } from '@/types/types'

type NozzleStore = {
    nozzles: Nozzle[]
    setNozzles: (nozzles: Nozzle[]) => void
}

export const useNozzleStore = create<NozzleStore>(set => ({
    nozzles: [] as Nozzle[],
    setNozzles: (nozzles: Nozzle[]) => set({ nozzles }),
}))

// ? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Variants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type NozzleVariantsStore = {
    nozzleVariants: NozzleVariants[]
    setNozzleVariants: (nozzleVariants: NozzleVariants[]) => void
}

export const useNozzleVariantsStore = create<NozzleVariantsStore>(set => ({
    nozzleVariants: [] as NozzleVariants[],
    setNozzleVariants: (nozzleVariants: NozzleVariants[]) => set({ nozzleVariants }),
}))
