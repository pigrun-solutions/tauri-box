import { useAuth } from './hooks/use-auth'
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from '@/components/theme-provider'
import { RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({ routeTree, context: undefined! })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    const authentication = useAuth()


    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <RouterProvider router={router} context={{ authentication }} />
        </ThemeProvider>
    )
}

export default App
