import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { SightGlassVariants } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { getAllSightGlassVariants } from '@/database/sightglasses'
import { useSightGlassVariantsStore } from '@/zustand/sightglasses-store'
import SightGlassVariantsTable from '@/components/dashboard/sight-glasses/slug/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/sightglasses/$id')({
    component: () => <SightGlassVariantsPage />,
})

const SightGlassVariantsPage = () => {
    const { id } = Route.useParams()
    const { setSightGlassVariants } = useSightGlassVariantsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getSightGlassVariants = async () => {
            try {
                const sightGlassVariants = await getAllSightGlassVariants(id)
                setSightGlassVariants(sightGlassVariants.data as SightGlassVariants[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getSightGlassVariants()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Sight Glass Variants'} />

            <SightGlassVariantsTable sightGlassId={id} />
        </div>
    )
}
