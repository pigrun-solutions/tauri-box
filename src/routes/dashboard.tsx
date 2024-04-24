import { Link, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
    beforeLoad: async ({ location }) => {
        if (!sessionStorage.getItem('isLoggedIn')) throw redirect({ to: '/', search: location.search })
    },
    component: () => (
        <div>
            <Link to="/">Home</Link>
        </div>
    ),
})
