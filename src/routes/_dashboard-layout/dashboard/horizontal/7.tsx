import { createFileRoute } from '@tanstack/react-router'
import StepSevenForm from '@/components/dashboard/orders/horizontal/step-seven-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/horizontal/7')({ component: () => <Horizontal7 /> })

const Horizontal7 = () => {
    return (
        <div className="space-y-8">
            <StepSevenForm />
        </div>
    )
}
