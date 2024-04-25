import CustomerForm from '@/components/dashboard/customers/slug/customer-form'
import { getCustomer } from '@/database/customers'
import { Customer } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/customers/$id')({
    loader: async ({ params }) => await getCustomer(params.id),
    component: () => <CustomerPage />,
})

const CustomerPage = () => {
    const props = Route.useLoaderData()
    const customer = props.data as Customer | undefined

    return (
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
            <CustomerForm initialData={customer} />
        </div>
    )
}
