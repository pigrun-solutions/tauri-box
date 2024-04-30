import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { GasketVariants } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { getAllGasketVariants } from '@/database/gaskets'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { useGasketVariantsStore } from '@/zustand/gasket-store'
import GasketVariantsTable from '@/components/dashboard/gaksets/slug/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/gaskets/$id')({
    component: () => <GasketVariantsPage />,
})

const GasketVariantsPage = () => {
    const { id } = Route.useParams()
    const { setGasketVariants } = useGasketVariantsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getGasketVariants = async () => {
            try {
                const gasketVariants = await getAllGasketVariants(id)
                setGasketVariants(gasketVariants.data as GasketVariants[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getGasketVariants()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Gasket Variants'} />

            <GasketVariantsTable gasketId={id} />
        </div>
    )
}
