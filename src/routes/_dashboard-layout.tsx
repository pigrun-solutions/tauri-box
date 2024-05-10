import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout')({
    beforeLoad: async ({ context }) => {
        const { isLogged } = context.authentication
        if (!isLogged()) throw redirect({ to: '/' })
    },
    component: () => (
        <div className="flex">
            <div className="absolute z-10 top-0 w-full flex items-center justify-center">
                {/* <div className="bg-green-800 text-white px-3 py-1 rounded-b-md text-sm font-semibold select-none">Connected</div> */}
                <div className="bg-red-800 text-white px-3 py-1 rounded-b-md text-sm font-semibold select-none">Disconnected</div>
            </div>
            <ScrollArea className="h-screen w-full">
                <main className="flex flex-col max-sm:h-[calc(100vh-1rem)] min-h-screen w-full bg-muted/40 p-4">
                    <Outlet />
                </main>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    ),
})
