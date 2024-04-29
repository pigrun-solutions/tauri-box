import { create } from 'zustand'
import { Gasket, GasketVariants } from '@/types/types'

type GasketsStore = {
    gaskets: Gasket[]
    setGaskets: (gaskets: Gasket[]) => void
}

export const useGasketsStore = create<GasketsStore>(set => ({
    gaskets: [] as Gasket[],
    setGaskets: (gaskets: Gasket[]) => set({ gaskets }),
}))

// ? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Variants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type GasketVariantsStore = {
    gasketVariants: GasketVariants[]
    setGasketVariants: (gaskets: GasketVariants[]) => void
}

export const useGasketVariantsStore = create<GasketVariantsStore>(set => ({
    gasketVariants: [] as GasketVariants[],
    setGasketVariants: (gasketVariants: GasketVariants[]) => set({ gasketVariants }),
}))
