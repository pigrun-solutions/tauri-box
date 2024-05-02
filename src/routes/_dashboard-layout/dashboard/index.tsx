import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { RectangleHorizontal } from 'lucide-react'
import NavigationItems from '@/context/navigation'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({ component: () => <Dashboard /> })

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full space-y-10">
            <Heading title="Troy Tank" />

            <div className="grid grid-cols-2 gap-4">
                <Card className={cn('hover:bg-muted-foreground/10 cursor-pointer h-32')} onClick={() => navigate({ to: '/dashboard/horizontal' })}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <RectangleHorizontal className="size-10" />
                        <h4 className="font-semibold text-lg">Horizontal Order</h4>
                    </div>
                </Card>
                <Card className={cn('hover:bg-muted-foreground/10 cursor-pointer h-32')} onClick={() => navigate({ to: '/dashboard/vertical' })}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <RectangleHorizontal className="size-10 rotate-90" />
                        <h4 className="font-semibold text-lg">Vertical Order</h4>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {NavigationItems.slice(1).map((nav, index): any => {
                    return (
                        <Card
                            key={index}
                            className={cn('hover:bg-muted-foreground/10 cursor-pointer', nav.disabled && 'bg-muted-foreground/10 cursor-not-allowed')}
                            onClick={() => !nav.disabled && navigate({ to: nav.href })}>
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
