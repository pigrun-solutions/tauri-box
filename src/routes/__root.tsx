import { AuthContext } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/sonner'
import useDisableContextMenu from '@/hooks/use-disable-menu'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

type RouterContext = {
    authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => {
        !import.meta.env.DEV && useDisableContextMenu()

        return (
            <>
                <Outlet />
                <Toaster richColors />
                {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
            </>
        )
    },
})
