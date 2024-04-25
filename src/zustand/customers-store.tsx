import { create } from 'zustand'
import { Customer } from '@/types/types'

type CustomersStore = {
    customers: Customer[]
    setCustomers: (customers: Customer[]) => void
}

export const useCustomersStore = create<CustomersStore>(set => ({
    customers: [] as Customer[],
    setCustomers: (customers: Customer[]) => set({ customers }),
}))
