import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/horizontal/')({
    loader: () => {
        throw redirect({ to: '/dashboard/horizontal/1' })
    },
    component: () => {
        const navigate = useNavigate()
        navigate({ to: '/dashboard/horizontal/1' })
        return <>You are not supposed to be here</>
    },
})
