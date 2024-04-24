import SideMenu from '@/components/nav/side-menu'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const Route = createRootRoute({
    component: () => {
        if (sessionStorage.getItem('isLoggedIn'))
            return (
                <>
                    <div className="flex">
                        <SideMenu />
                        <ScrollArea className="h-screen w-full">
                            <main className="flex h-[calc(100vh-1rem)] w-full bg-muted/40 p-4">
                                <Outlet />
                            </main>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                    <TanStackRouterDevtools />
                </>
            )
        else
            return (
                <>
                    <Outlet />
                    <TanStackRouterDevtools />
                </>
            )
    },
})
