import { toast } from 'sonner'
import { Bolt } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllBolts } from '@/database/bolts'
import { useBoltsStore } from '@/zustand/bolts-store'
import { createFileRoute } from '@tanstack/react-router'
import BoltsTable from '@/components/dashboard/bolts/table'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

export const Route = createFileRoute('/_dashboard-layout/dashboard/bolts/')({
    component: () => <Bolts />,
})

const Bolts = () => {
    const { setBolts } = useBoltsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getBolts = async () => {
            try {
                const bolts = await getAllBolts()
                setBolts(bolts.data as Bolt[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getBolts()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Bolts'} />

            <BoltsTable />
        </div>
    )
}
