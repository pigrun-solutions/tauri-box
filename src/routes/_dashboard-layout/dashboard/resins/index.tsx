import { toast } from 'sonner'
import { Resin } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllResins } from '@/database/resin'
import { useResinStore } from '@/zustand/resin-store'
import TableHeader from '@/components/ui/table-header'
import { createFileRoute } from '@tanstack/react-router'
import ResinTable from '@/components/dashboard/resins/table'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

export const Route = createFileRoute('/_dashboard-layout/dashboard/resins/')({
    component: () => <Resins />,
})

const Resins = () => {
    const { setResin } = useResinStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getGlasses = async () => {
            try {
                const resins = await getAllResins()
                setResin(resins.data as Resin[])
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
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Resin'}>
                <TableHeader />
            </FormBreadcrumbs>

            <ResinTable />
        </div>
    )
}
