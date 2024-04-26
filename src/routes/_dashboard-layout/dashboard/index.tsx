import { createFileRoute } from '@tanstack/react-router'
import BasicRowEditingGrid from '@/components/dashboard/main/data-table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({ component: () => <Dashboard /> })

const Dashboard = () => {
    return (
        <div className="w-full">
            <BasicRowEditingGrid />
        </div>
    )
}
