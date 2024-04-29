import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({ component: () => <Dashboard /> })

const Dashboard = () => {
    return <div className="w-full">anything</div>
}
