import { toast } from 'sonner'
import { Additive } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getAllAdditives } from '@/database/additives'
import { createFileRoute } from '@tanstack/react-router'
import { useAdditivesStore } from '@/zustand/additives-store'
import StepFiveForm from '@/components/dashboard/orders/horizontal/step-five-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/horizontal/5')({
    component: () => <Horizontal5 />,
})

const Horizontal5 = () => {
    const { setAdditives } = useAdditivesStore()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getAll = async () => {
            try {
                const additives = await getAllAdditives()
                setAdditives(additives.data as Additive[])
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
            <StepFiveForm />
        </div>
    )
}
