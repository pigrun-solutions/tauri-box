import { toast } from 'sonner'
import { Customer } from '@/types/types'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getAllCustomers } from '@/database/customers'
import { createFileRoute } from '@tanstack/react-router'
import { useCustomersStore } from '@/zustand/customers-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import CustomersTable from '@/components/dashboard/customers/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/customers/')({
    component: () => <Customers />,
})

const Customers = () => {
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
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Customers'} />

            <CustomersTable />
        </div>
    )
}
