import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getAllBolts } from '@/database/bolts'
import { getAllGaskets } from '@/database/gaskets'
import { getAllNozzles } from '@/database/nozzles'
import { useBoltsStore } from '@/zustand/bolts-store'
import { createFileRoute } from '@tanstack/react-router'
import { useGasketsStore } from '@/zustand/gasket-store'
import { useNozzleStore } from '@/zustand/nozzles-store'
import { getAllSightGlasses } from '@/database/sightglasses'
import { Bolt, Gasket, Nozzle, SightGlasses } from '@/types/types'
import { useSightGlassesStore } from '@/zustand/sightglasses-store'
import StepThreeForm from '@/components/dashboard/orders/vertical/step-three-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/vertical/3')({ component: () => <Vertical3 /> })

const Vertical3 = () => {
    const { setBolts } = useBoltsStore()
    const { setNozzles } = useNozzleStore()
    const { setGaskets } = useGasketsStore()
    const { setSightGlasses } = useSightGlassesStore()

    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getAll = async () => {
            try {
                const [nozzles, bolts, gaskets, sightglasses] = await Promise.all([await getAllNozzles(), await getAllBolts(), await getAllGaskets(), await getAllSightGlasses()])
                setNozzles(nozzles.data as Nozzle[])
                setBolts(bolts.data as Bolt[])
                setGaskets(gaskets.data as Gasket[])
                setSightGlasses(sightglasses.data as SightGlasses[])
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
            <StepThreeForm />
        </div>
    )
}
