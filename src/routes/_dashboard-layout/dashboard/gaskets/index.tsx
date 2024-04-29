import { toast } from 'sonner'
import { Gasket } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllGaskets } from '@/database/gaskets'
import { useGasketsStore } from '@/zustand/gasket-store'
import { createFileRoute } from '@tanstack/react-router'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import GasketsTable from '@/components/dashboard/gaksets/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/gaskets/')({
    component: () => <Gaskets />,
})

const Gaskets = () => {
    const { setGaskets } = useGasketsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getGaskets = async () => {
            try {
                const gaskets = await getAllGaskets()
                setGaskets(gaskets.data as Gasket[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getGaskets()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Gaskets'} />

            <GasketsTable />
        </div>
    )
}
