import React from 'react'
import { Button } from './button'
import { ChevronLeft } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

type FormHeaderProps = {
    title: string
    loading?: boolean
    children?: React.ReactNode
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, loading, children }) => {
    const router = useRouterState()
    const pathname = router.location.pathname

    // ? pathname but without last segment
    const url = pathname.split('/').slice(0, -1).join('/')

    return (
        <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
                <Button type="button" disabled={loading} variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link to={`${url}`}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold capitalize tracking-tight sm:grow-0">{title}</h1>
            </div>

            {children}
        </div>
    )
}

export default FormHeader
