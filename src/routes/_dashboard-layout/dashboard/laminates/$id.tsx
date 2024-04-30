import { toast } from 'sonner'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { Glass, Laminate, LaminateDetails } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { getLaminate, getLaminateDetails } from '@/database/laminates'
import LaminateForm from '@/components/dashboard/laminates/slug/laminate-form'
import { getAllGlasses } from '@/database/glasses'

export const Route = createFileRoute('/_dashboard-layout/dashboard/laminates/$id')({
    component: () => <LaminateDetailsPage />,
})

const LaminateDetailsPage = () => {
    const { id } = Route.useParams()
    const [laminate, setLaminate] = useState<LaminateDetails[]>()
    const [glass, setGlass] = useState<Glass[]>()
    const [laminateName, setLaminateName] = useState<Laminate>()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getLaminateDeatil = async () => {
            try {
                const [laminates, glasses, lamName] = await Promise.all([await getLaminateDetails(id), await getAllGlasses(), await getLaminate(id)])
                const laminateData = laminates.data as LaminateDetails[]
                const glassData = glasses.data as Glass[]
                const lamNameData = lamName.data as Laminate[]
                setLaminate(laminateData)
                setGlass(glassData)
                setLaminateName(lamNameData[0])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getLaminateDeatil()
    }, [])

    if (loading) return <Loader />
    return (
        <div className="mx-auto grid w-full h-full flex-1 auto-rows-max gap-4">
            {laminate && laminate[0] && <LaminateForm initialData={laminate[0]} name={laminateName?.name} glass={glass} laminateId={id} />}
        </div>
    )
}
