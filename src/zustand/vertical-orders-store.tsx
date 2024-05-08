import { create } from 'zustand'
import { AdditionalCosts, ManwayTable, OrderDesign, OrderNozzle, Step6Type } from '@/types/types'

type VerticalStepOneStore = {
    stepOne: OrderDesign
    setStepOne: (stepOne: OrderDesign) => void
    resetStepOne: () => void
}

export const useVerticalStepOneStore = create<VerticalStepOneStore>(set => ({
    stepOne: {} as OrderDesign,
    setStepOne: (stepOne: OrderDesign) => set({ stepOne }),
    resetStepOne: () => set({ stepOne: {} as OrderDesign }),
}))
// ! ======================================== ! //

type VerticalStepThreeStore = {
    stepThree: OrderNozzle[]
    setStepThree: (stepThree: OrderNozzle[]) => void
    resetStepThree: () => void
}

export const useVerticalStepThreeStore = create<VerticalStepThreeStore>(set => ({
    stepThree: [] as OrderNozzle[],
    setStepThree: (stepThree: OrderNozzle[]) => set({ stepThree }),
    resetStepThree: () => set({ stepThree: [] as OrderNozzle[] }),
}))
// ! ======================================== ! //

type VerticalStepFourStore = {
    stepFour: ManwayTable[]
    setStepFour: (stepFour: ManwayTable[]) => void
    resetStepFour: () => void
}

export const useVerticalStepFourStore = create<VerticalStepFourStore>(set => ({
    stepFour: [] as ManwayTable[],
    setStepFour: (stepFour: ManwayTable[]) => set({ stepFour }),
    resetStepFour: () => set({ stepFour: [] as ManwayTable[] }),
}))
// ! ======================================== ! //

type VerticalStepFiveStore = {
    stepFive: AdditionalCosts
    setStepFive: (stepFive: AdditionalCosts) => void
    resetStepFive: () => void
}

export const useVerticalStepFiveStore = create<VerticalStepFiveStore>(set => ({
    stepFive: {} as AdditionalCosts,
    setStepFive: (stepFive: AdditionalCosts) => set({ stepFive }),
    resetStepFive: () => set({ stepFive: {} as AdditionalCosts }),
}))
// ! ======================================== ! //

type VerticalStepSixStore = {
    stepSix: Step6Type
    setStepSix: (stepSix: Step6Type) => void
    resetStepSix: () => void
}

export const useVerticalStepSixStore = create<VerticalStepSixStore>(set => ({
    stepSix: {} as Step6Type,
    setStepSix: (stepSix: Step6Type) => set({ stepSix }),
    resetStepSix: () => set({ stepSix: {} as Step6Type }),
}))
// ! ======================================== ! //
