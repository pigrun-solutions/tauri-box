import { toast } from 'sonner'
import { Nozzle } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllNozzles } from '@/database/nozzles'
import { createFileRoute } from '@tanstack/react-router'
import { useNozzleStore } from '@/zustand/nozzles-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import NozzleTable from '@/components/dashboard/nozzles/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/nozzles/')({
    component: () => <Nozzles />,
})

const Nozzles = () => {
    const { setNozzles } = useNozzleStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getNozzles = async () => {
            try {
                const gaskets = await getAllNozzles()
                setNozzles(gaskets.data as Nozzle[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getNozzles()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Gaskets'} />

            <NozzleTable />
        </div>
    )
}
