import { toast } from 'sonner'
import { Glass } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllGlasses } from '@/database/glasses'
import { createFileRoute } from '@tanstack/react-router'
import { useGlassesStore } from '@/zustand/glasses-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import GlassesTable from '@/components/dashboard/glasses/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/glasses/')({
    component: () => <Glasses />,
})

const Glasses = () => {
    const { setGlasses } = useGlassesStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getGlasses = async () => {
            try {
                const glasses = await getAllGlasses()
                setGlasses(glasses.data as Glass[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getGlasses()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Glasses'} />

            <GlassesTable />
        </div>
    )
}
