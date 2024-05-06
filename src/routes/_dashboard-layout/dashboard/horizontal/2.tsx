import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { Laminate, Resin } from '@/types/types'
import { getAllResins } from '@/database/resin'
import { useResinStore } from '@/zustand/resin-store'
import { getAllLaminates } from '@/database/laminates'
import { createFileRoute } from '@tanstack/react-router'
import { useLaminateStore } from '@/zustand/laminate-store'
import StepTwoForm from '@/components/dashboard/orders/horizontal/step-two-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/horizontal/2')({
    component: () => <Horizontal2 />,
})

const Horizontal2 = () => {
    const { setResin } = useResinStore()
    const { setLaminates } = useLaminateStore()

    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getAll = async () => {
            try {
                const [resins, laminates] = await Promise.all([await getAllResins(), await getAllLaminates()])
                setResin(resins.data as Resin[])
                setLaminates(laminates.data as Laminate[])
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
