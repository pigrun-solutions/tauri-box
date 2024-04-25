import { Additive } from '@/types/types'
import { create } from 'zustand'

type AdditivesStore = {
    additives: Additive[]
    setAdditives: (additives: Additive[]) => void
}

export const useAdditivesStore = create<AdditivesStore>(set => ({
    additives: [] as Additive[],
    setAdditives: (additives: Additive[]) => set({ additives }),
}))
