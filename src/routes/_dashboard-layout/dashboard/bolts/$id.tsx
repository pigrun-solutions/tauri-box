import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { BoltVariants } from '@/types/types'
import { getAllBoltVariants } from '@/database/bolts'
import { createFileRoute } from '@tanstack/react-router'
import { useBoltVariantsStore } from '@/zustand/bolts-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import BoltVariantsTable from '@/components/dashboard/bolts/slug/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/bolts/$id')({
    component: () => <BoltVariantsPage />,
})

const BoltVariantsPage = () => {
    const { id } = Route.useParams()
    const { setBoltVariants } = useBoltVariantsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getBoltVariants = async () => {
            try {
                const boltVariants = await getAllBoltVariants(id)
                setBoltVariants(boltVariants.data as BoltVariants[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getBoltVariants()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <FormBreadcrumbs currentPage={'Bolt Variants'} />

            <BoltVariantsTable boltId={id} />
        </div>
    )
}
