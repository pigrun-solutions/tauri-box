import { toast } from 'sonner'
import { LiftLug } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllLiftLugs } from '@/database/liftlugs'
import { createFileRoute } from '@tanstack/react-router'
import { useLiftLugsStore } from '@/zustand/liftlugs-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import LiftLugsTable from '@/components/dashboard/lift-lugs/table'

export const Route = createFileRoute('/_dashboard-layout/dashboard/liftlugs/')({ component: () => <LiftLugs /> })

const LiftLugs = () => {
    const { setLiftLugs } = useLiftLugsStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getLiftLugs = async () => {
            try {
                const liftLugs = await getAllLiftLugs()
                setLiftLugs(liftLugs.data as LiftLug[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getLiftLugs()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="flex h-full w-full grow flex-col gap-4">
            <FormBreadcrumbs currentPage={'Lift Lugs'} />

            <LiftLugsTable />
        </div>
    )
}
