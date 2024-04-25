import { toast } from 'sonner'
import { Additive } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllAdditives } from '@/database/additives'
import TableHeader from '@/components/ui/table-header'
import { createFileRoute } from '@tanstack/react-router'
import { useAdditivesStore } from '@/zustand/additives-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import AdditivesTable from '@/components/dashboard/additives/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/additives/')({
    component: () => <Additives />,
})

const Additives = () => {
    const { setAdditives } = useAdditivesStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getAdditives = async () => {
            try {
                const additives = await getAllAdditives()
                setAdditives(additives.data as Additive[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getAdditives()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Additives'}>
                <TableHeader />
            </FormBreadcrumbs>

            <AdditivesTable />
        </div>
    )
}
