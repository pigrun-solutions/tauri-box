import { create } from 'zustand'
import { ManwayTable, OrderDesign, OrderNozzle, OrderTankData } from '@/types/types'

type StepOneStore = {
    stepOne: OrderDesign
    setStepOne: (stepOne: OrderDesign) => void
}

export const useStepOneStore = create<StepOneStore>(set => ({
    stepOne: {} as OrderDesign,
    setStepOne: (stepOne: OrderDesign) => set({ stepOne }),
}))
// ! ======================================== ! //

type StepTwoStore = {
    stepTwo: OrderTankData
    setStepTwo: (stepTwo: OrderTankData) => void
}

export const useStepTwoStore = create<StepTwoStore>(set => ({
    stepTwo: {} as OrderTankData,
    setStepTwo: (stepTwo: OrderTankData) => set({ stepTwo }),
}))

// ! ======================================== ! //

type StepThreeStore = {
    stepThree: OrderNozzle[]
    setStepThree: (stepThree: OrderNozzle[]) => void
}

export const useStepThreeStore = create<StepThreeStore>(set => ({
    stepThree: [] as OrderNozzle[],
    setStepThree: (stepThree: OrderNozzle[]) => set({ stepThree }),
}))

// ! ======================================== ! //

type StepFourStore = {
    stepFour: ManwayTable[]
    setStepFour: (stepFour: ManwayTable[]) => void
}

export const useStepFourStore = create<StepFourStore>(set => ({
    stepFour: [] as ManwayTable[],
    setStepFour: (stepFour: ManwayTable[]) => set({ stepFour }),
}))
