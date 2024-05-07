import { createFileRoute } from '@tanstack/react-router'
import StepSixForm from '@/components/dashboard/orders/horizontal/step-six-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/horizontal/6')({
    component: () => <Horizontal6 />,
})

const Horizontal6 = () => {
    return (
        <div className="space-y-8">
            <StepSixForm />
        </div>
    )
}
