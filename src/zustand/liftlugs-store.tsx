import { create } from 'zustand'
import { LiftLug } from '@/types/types'

type LiftLugsStore = {
    liftlugs: LiftLug[]
    setLiftLugs: (liftlugs: LiftLug[]) => void
}

export const useLiftLugsStore = create<LiftLugsStore>(set => ({
    liftlugs: [] as LiftLug[],
    setLiftLugs: (liftlugs: LiftLug[]) => set({ liftlugs }),
}))
