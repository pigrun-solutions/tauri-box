import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { ManwayVariants } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { getAllManwayVariants } from '@/database/manways'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { useManwayVariantsStore } from '@/zustand/manways-store'
import ManwayVariantsTable from '@/components/dashboard/manways/slug/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/manways/$id')({
    component: () => <GasketVariantsPage />,
})

const GasketVariantsPage = () => {
    const { id } = Route.useParams()
    const { setManwayVariants } = useManwayVariantsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getManwayVariants = async () => {
            try {
                const gasketVariants = await getAllManwayVariants(id)
                setManwayVariants(gasketVariants.data as ManwayVariants[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getManwayVariants()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Manway Variants'} />

            <ManwayVariantsTable manwayId={id} />
        </div>
    )
}
