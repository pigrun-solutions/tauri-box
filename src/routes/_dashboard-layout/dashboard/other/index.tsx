import { toast } from 'sonner'
import { Other } from '@/types/types'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { getFristOther } from '@/database/other'
import { createFileRoute } from '@tanstack/react-router'
import OtherForm from '@/components/dashboard/other/other-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/other/')({
    component: () => <OtherPage />,
})

const OtherPage = () => {
    const [other, setOther] = useState<Other[]>()
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(() => {
        const getOther = async () => {
            try {
                const other = await getFristOther()
                const otherData = other.data as Other[]
                setOther(otherData)
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        getOther()
    }, [])

    if (loading) return <Loader />
    return <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">{other && other[0] && <OtherForm initialData={other[0]} />}</div>
}
