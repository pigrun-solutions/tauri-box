import React from 'react'
import { Button } from './button'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

type FormHeaderStepsProps = {
    title: string
    last?: boolean
    loading?: boolean
}

const FormHeaderSteps: React.FC<FormHeaderStepsProps> = ({ title, loading, last }) => {
    const router = useRouterState()
    const pathname = router.location.pathname

    let url

    // ? get last item in pathname
    const lastItem = pathname.split('/').pop()
    if (lastItem === '1') url = '/dashboard'
    else {
        // ? change lastItem to number and subtract 1
        const lastItemNumber = Number(lastItem)
        const prevItem = lastItemNumber - 1
        url = pathname.split('/').slice(0, -1).join('/') + '/' + prevItem
    }

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
                <Button type="submit" size="sm" disabled={loading}>
                    {loading && <Loader2 className="mr-2 size-4 animate-spin" />} {last ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    )
}

export default FormHeaderSteps
