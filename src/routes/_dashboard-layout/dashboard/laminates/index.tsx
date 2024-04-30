import { toast } from 'sonner'
import { Laminate } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllLaminates } from '@/database/laminates'
import { createFileRoute } from '@tanstack/react-router'
import { useLaminateStore } from '@/zustand/laminate-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import LaminatesTable from '@/components/dashboard/laminates/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/laminates/')({
    component: () => <Laminates />,
})

const Laminates = () => {
    const { setLaminates } = useLaminateStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getLaminates = async () => {
            try {
                const laminates = await getAllLaminates()
                setLaminates(laminates.data as Laminate[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getLaminates()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Laminates'} />

            <LaminatesTable />
        </div>
    )
}
