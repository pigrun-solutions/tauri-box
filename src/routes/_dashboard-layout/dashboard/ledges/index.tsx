import { toast } from 'sonner'
import { Ledge } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllLedges } from '@/database/ledges'
import { useLedgeStore } from '@/zustand/ledges-store'
import { createFileRoute } from '@tanstack/react-router'
import LedgesTable from '@/components/dashboard/ledges/table'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

export const Route = createFileRoute('/_dashboard-layout/dashboard/ledges/')({ component: () => <LiftLugs /> })

const LiftLugs = () => {
    const { setLedges } = useLedgeStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getLedges = async () => {
            try {
                const ledges = await getAllLedges()
                setLedges(ledges.data as Ledge[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getLedges()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Lift Lugs'} />

            <LedgesTable />
        </div>
    )
}
