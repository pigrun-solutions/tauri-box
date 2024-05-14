import useSocket from '@/hooks/use-socket'
import ConnectedStatus from '@/components/ui/connected'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout')({
    beforeLoad: async ({ context }) => {
        const { isLogged } = context.authentication
        if (!isLogged()) throw redirect({ to: '/' })
    },
    component: () => {
        useSocket()

        return (
            <div className="flex">
                <ConnectedStatus />

                <ScrollArea className="h-screen w-full">
                    <main className="flex flex-col max-sm:h-[calc(100vh-1rem)] min-h-screen w-full bg-muted/40 p-4">
                        <Outlet />
                    </main>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        )
    },
})
