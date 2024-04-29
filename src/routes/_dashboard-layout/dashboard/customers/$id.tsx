import { toast } from 'sonner'
import { Customer } from '@/types/types'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getCustomer } from '@/database/customers'
import { createFileRoute } from '@tanstack/react-router'
import CustomerForm from '@/components/dashboard/customers/slug/customer-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/customers/$id')({
    component: () => <CustomerPage />,
})

const CustomerPage = () => {
    const { id } = Route.useParams()
    const [customer, setCustomer] = useState<Customer[]>()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getCustomerDetails = async () => {
            try {
                const boltVariants = await getCustomer(id)
                setCustomer(boltVariants.data as Customer[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getCustomerDetails()
    }, [])

    if (loading) return <Loader />
    return <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">{customer && customer[0] && <CustomerForm initialData={customer[0]} />}</div>
}
