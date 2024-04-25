import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useRouterState } from '@tanstack/react-router'

const TableHeader = () => {
    const router = useRouterState()
    const pathname = router.location.pathname + '/add'

    return (
        <section className="flex items-center justify-end">
            <Button size="sm" className="h-7 gap-1" asChild>
                <Link to={`${pathname}`}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New</span>
                </Link>
            </Button>
        </section>
    )
}

export default TableHeader
