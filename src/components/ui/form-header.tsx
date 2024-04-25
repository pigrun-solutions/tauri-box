import React from 'react'
import { Button } from './button'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

type FormHeaderProps = {
    title: string
    loading?: boolean
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, loading }) => {
    const router = useRouterState()
    const pathname = router.location.pathname

    // ? pathname but without last segment
    const url = pathname.split('/').slice(0, -1).join('/')

    return (
        <div className="flex items-center gap-4">
            <Button type="button" disabled={loading} variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link to={`${url}`}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold capitalize tracking-tight sm:grow-0">{title}</h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button type="button" disabled={loading} variant="outline" size="sm" asChild>
                    <Link to={`${url}`}>Discard</Link>
                </Button>
                <Button type="submit" size="sm" disabled={loading}>
                    {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Save
                </Button>
            </div>
        </div>
    )
}

export default FormHeader
