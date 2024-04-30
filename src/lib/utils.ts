import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// ? convert from kg to lbs
export const kgToLbs = (kg: number) => (kg / 2.20462).toFixed(2)
export const lbsToKg = (lbs: number) => (lbs * 2.20462).toFixed(2)
