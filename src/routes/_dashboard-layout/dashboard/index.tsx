import { cn } from '@/lib/utils'
import { Box, Boxes } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({ component: () => <Dashboard /> })

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="flex justify-between">
                <Heading title="Patrack Box" />
                <ModeToggle />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card className={cn('hover:bg-muted-foreground/10 aspect-square cursor-pointer grid place-items-center h-full')} onClick={() => navigate({ to: '/dashboard/single-box' })}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <Box className="size-12" />
                        <h4 className="font-semibold text-xl">Single Box</h4>
                    </div>
                </Card>
                <Card className={cn('hover:bg-muted-foreground/10 aspect-square cursor-pointer grid place-items-center h-full')} onClick={() => navigate({ to: '/dashboard/multi-box' })}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <Boxes className="size-12" />
                        <h4 className="font-semibold text-xl">Multiple Boxes</h4>
                    </div>
                </Card>
            </div>
        </div>
    )
}
