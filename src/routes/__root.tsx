import { useMemo } from 'react'
import { AuthContext } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/sonner'
import useDisableContextMenu from '@/hooks/use-disable-menu'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material'

type RouterContext = {
    authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => {
        !import.meta.env.DEV && useDisableContextMenu()

        const theme = localStorage.getItem('vite-ui-theme')
        const getDesignTokens = (mode: PaletteMode) => ({ palette: { mode } })
        const themes = useMemo(() => createTheme(getDesignTokens((theme as 'dark' | 'light' | undefined) || 'light')), [theme])

        return (
            <ThemeProvider theme={themes}>
                <Outlet />
                <Toaster richColors />
                {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
            </ThemeProvider>
        )
    },
})
