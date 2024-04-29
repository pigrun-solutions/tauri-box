import { toast } from 'sonner'
import { Vent } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllVents } from '@/database/vents'
import { useVentsStore } from '@/zustand/vents-store'
import { createFileRoute } from '@tanstack/react-router'
import VentsTable from '@/components/dashboard/vents/table'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

export const Route = createFileRoute('/_dashboard-layout/dashboard/vents/')({
    component: () => <Vents />,
})

const Vents = () => {
    const { setVents } = useVentsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getVents = async () => {
            try {
                const vents = await getAllVents()
                setVents(vents.data as Vent[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getVents()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Vents'} />

            <VentsTable />
        </div>
    )
}
