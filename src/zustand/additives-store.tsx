import { create } from 'zustand'

type AdditivesStore = {
    additives: string[]
    setAdditives: (additives: string[]) => void
}

export const useAdditivesStore = create<AdditivesStore>(set => ({
    additives: [] as string[],
    setAdditives: (additives: string[]) => set({ additives }),
}))
