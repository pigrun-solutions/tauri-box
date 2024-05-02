import { toast } from 'sonner'
import { Customer } from '@/types/types'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getAllCustomers } from '@/database/customers'
import { createFileRoute } from '@tanstack/react-router'
import { useCustomersStore } from '@/zustand/customers-store'
import StepOneForm from '@/components/dashboard/orders/horizontal/step-one-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/horizontal/1')({
    component: () => <Horizontal1 />,
})

const Horizontal1 = () => {
    const { setCustomers } = useCustomersStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const customers = await getAllCustomers()
                setCustomers(customers.data as Customer[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getCustomers()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="space-y-8">
            <StepOneForm />
        </div>
    )
}
