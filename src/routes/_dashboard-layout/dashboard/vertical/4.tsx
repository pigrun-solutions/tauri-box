import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getAllBolts } from '@/database/bolts'
import { getAllGaskets } from '@/database/gaskets'
import { getAllManways } from '@/database/manways'
import { Bolt, Gasket, Manway } from '@/types/types'
import { useBoltsStore } from '@/zustand/bolts-store'
import { useGasketsStore } from '@/zustand/gasket-store'
import { useManwayStore } from '@/zustand/manways-store'
import { createFileRoute } from '@tanstack/react-router'
import StepFourForm from '@/components/dashboard/orders/vertical/step-four-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/vertical/4')({ component: () => <Vertical4 /> })

const Vertical4 = () => {
    const { setBolts } = useBoltsStore()
    const { setManways } = useManwayStore()
    const { setGaskets } = useGasketsStore()

    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getAll = async () => {
            try {
                const [bolts, gaskets, manways] = await Promise.all([await getAllBolts(), await getAllGaskets(), await getAllManways()])
                setBolts(bolts.data as Bolt[])
                setGaskets(gaskets.data as Gasket[])
                setManways(manways.data as Manway[])
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
            <StepFourForm />
        </div>
    )
}
