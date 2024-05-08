import { create } from 'zustand'
import { AdditionalCosts, ManwayTable, OrderDesign, OrderNozzle, OrderSaddle, OrderTankData, Step6Type } from '@/types/types'

type StepOneStore = {
    stepOne: OrderDesign
    setStepOne: (stepOne: OrderDesign) => void
    resetStepOne: () => void
}

export const useStepOneStore = create<StepOneStore>(set => ({
    stepOne: {} as OrderDesign,
    setStepOne: (stepOne: OrderDesign) => set({ stepOne }),
    resetStepOne: () => set({ stepOne: {} as OrderDesign }),
}))
// ! ======================================== ! //

type StepTwoStore = {
    stepTwo: OrderTankData
    setStepTwo: (stepTwo: OrderTankData) => void
    resetStepTwo: () => void
}

export const useStepTwoStore = create<StepTwoStore>(set => ({
    stepTwo: {} as OrderTankData,
    setStepTwo: (stepTwo: OrderTankData) => set({ stepTwo }),
    resetStepTwo: () => set({ stepTwo: {} as OrderTankData }),
}))
// ! ======================================== ! //

type StepThreeStore = {
    stepThree: OrderNozzle[]
    setStepThree: (stepThree: OrderNozzle[]) => void
    resetStepThree: () => void
}

export const useStepThreeStore = create<StepThreeStore>(set => ({
    stepThree: [] as OrderNozzle[],
    setStepThree: (stepThree: OrderNozzle[]) => set({ stepThree }),
    resetStepThree: () => set({ stepThree: [] as OrderNozzle[] }),
}))
// ! ======================================== ! //

type StepFourStore = {
    stepFour: ManwayTable[]
    setStepFour: (stepFour: ManwayTable[]) => void
    resetStepFour: () => void
}

export const useStepFourStore = create<StepFourStore>(set => ({
    stepFour: [] as ManwayTable[],
    setStepFour: (stepFour: ManwayTable[]) => set({ stepFour }),
    resetStepFour: () => set({ stepFour: [] as ManwayTable[] }),
}))
// ! ======================================== ! //

type StepFiveStore = {
    stepFive: AdditionalCosts
    setStepFive: (stepFive: AdditionalCosts) => void
    resetStepFive: () => void
}

export const useStepFiveStore = create<StepFiveStore>(set => ({
    stepFive: {} as AdditionalCosts,
    setStepFive: (stepFive: AdditionalCosts) => set({ stepFive }),
    resetStepFive: () => set({ stepFive: {} as AdditionalCosts }),
}))
// ! ======================================== ! //

type StepSixStore = {
    stepSix: Step6Type
    setStepSix: (stepSix: Step6Type) => void
    resetStepSix: () => void
}

export const useStepSixStore = create<StepSixStore>(set => ({
    stepSix: {} as Step6Type,
    setStepSix: (stepSix: Step6Type) => set({ stepSix }),
    resetStepSix: () => set({ stepSix: {} as Step6Type }),
}))
// ! ======================================== ! //

type StepSevenStore = {
    stepSeven: OrderSaddle
    setStepSeven: (stepSeven: OrderSaddle) => void
    resetStepSeven: () => void
}

export const useStepSevenStore = create<StepSevenStore>(set => ({
    stepSeven: {} as OrderSaddle,
    setStepSeven: (stepSeven: OrderSaddle) => set({ stepSeven }),
    resetStepSeven: () => set({ stepSeven: {} as OrderSaddle }),
}))
