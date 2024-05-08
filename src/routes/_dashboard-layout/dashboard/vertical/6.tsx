import { createFileRoute } from '@tanstack/react-router'
import StepSixForm from '@/components/dashboard/orders/vertical/step-six-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/vertical/6')({ component: () => <Vertical6 /> })

const Vertical6 = () => {
    return (
        <div className="space-y-8">
            <StepSixForm />
        </div>
    )
}
