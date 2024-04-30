import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { NozzleVariants } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { getAllNozzleVariants } from '@/database/nozzles'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { useNozzleVariantsStore } from '@/zustand/nozzles-store'
import NozzleVariantsTable from '@/components/dashboard/nozzles/slug/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/nozzles/$id')({
    component: () => <NozzleVariantsPage />,
})

const NozzleVariantsPage = () => {
    const { id } = Route.useParams()
    const { setNozzleVariants } = useNozzleVariantsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getNozzleVariants = async () => {
            try {
                const gasketVariants = await getAllNozzleVariants(id)
                setNozzleVariants(gasketVariants.data as NozzleVariants[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getNozzleVariants()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Nozzle Variants'} />

            <NozzleVariantsTable nozzleId={id} />
        </div>
    )
}
