import { createFileRoute } from '@tanstack/react-router'
import MultiBoxForm from '@/components/dashboard/multi-box-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/multi-box')({ component: () => <MultiBox /> })

const MultiBox = () => {
    return (
        <section className="grow space-y-3 z-50">
            <MultiBoxForm />
        </section>
    )
}
