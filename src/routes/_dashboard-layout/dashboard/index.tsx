import { Card } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import NavigationItems from '@/context/navigation'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({ component: () => <Dashboard /> })

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full space-y-10">
            <Heading title="Troy Tank" />

            <div className="grid grid-cols-2 gap-4">
                {NavigationItems.slice(1).map((nav, index): any => {
                    return (
                        <Card key={index} className="hover:bg-muted-foreground/10 cursor-pointer" onClick={() => navigate({ to: nav.href })}>
                            <div className="flex items-center p-4 gap-4">
                                {nav.icon}
                                <h4>{nav.label}</h4>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
