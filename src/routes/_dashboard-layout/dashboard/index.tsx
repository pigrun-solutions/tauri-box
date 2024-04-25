import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({
    component: () => <div>Hello /dashboard/!</div>,
})
