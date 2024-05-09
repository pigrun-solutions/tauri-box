import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllResins } from '@/database/resin'
import { getAllLedges } from '@/database/ledges'
import { useResinStore } from '@/zustand/resin-store'
import { useLedgeStore } from '@/zustand/ledges-store'
import { getAllLaminates } from '@/database/laminates'
import { Laminate, Ledge, Resin } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { useLaminateStore } from '@/zustand/laminate-store'
import StepTwoForm from '@/components/dashboard/orders/vertical/step-two-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/vertical/2')({ component: () => <Vertical2 /> })

const Vertical2 = () => {
    const { setResin } = useResinStore()
    const { setLedges } = useLedgeStore()
    const { setLaminates } = useLaminateStore()

    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getAll = async () => {
            try {
                const [resins, laminates, ledges] = await Promise.all([await getAllResins(), await getAllLaminates(), await getAllLedges()])
                setResin(resins.data as Resin[])
                setLaminates(laminates.data as Laminate[])
                setLedges(ledges.data as Ledge[])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getAll()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="space-y-8">
            <StepTwoForm />
        </div>
    )
}
