import { createFileRoute } from '@tanstack/react-router'
import SingleBoxForm from '@/components/dashboard/single-box-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/single-box')({ component: () => <SingleBox /> })

const SingleBox = () => {
    return (
        <section className="grow space-y-3 z-50">
            <SingleBoxForm />
        </section>
    )
}
