import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { SightGlasses } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { getAllSightGlasses } from '@/database/sightglasses'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { useSightGlassesStore } from '@/zustand/sightglasses-store'
import SightGlassesTable from '@/components/dashboard/sight-glasses/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/sightglasses/')({
    component: () => <SightGlass />,
})

const SightGlass = () => {
    const { setSightGlasses } = useSightGlassesStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getBolts = async () => {
            try {
                const sightGlasses = await getAllSightGlasses()
                setSightGlasses(sightGlasses.data as SightGlasses[])
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
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Sight Glasses'} />

            <SightGlassesTable />
        </div>
    )
}
