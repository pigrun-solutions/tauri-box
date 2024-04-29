import { toast } from 'sonner'
import { Manway } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllManways } from '@/database/manways'
import { createFileRoute } from '@tanstack/react-router'
import { useManwayStore } from '@/zustand/manways-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import ManwaysTable from '@/components/dashboard/manways/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/manways/')({
    component: () => <Manways />,
})

const Manways = () => {
    const { setManways } = useManwayStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getManways = async () => {
            try {
                const gaskets = await getAllManways()
                setManways(gaskets.data as Manway[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getManways()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Gaskets'} />

            <ManwaysTable />
        </div>
    )
}
