import { toast } from 'sonner'
import { Settings } from '@/types/types'
import Loader from '@/components/ui/loader'
import { useEffect, useState } from 'react'
import { getSettings } from '@/database/settings'
import { createFileRoute } from '@tanstack/react-router'
import { useSettingsStore } from '@/zustand/settings-store'
import SingleBoxForm from '@/components/dashboard/single-box-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/single-box')({ component: () => <SingleBox /> })

const SingleBox = () => {
    const { setSettings } = useSettingsStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getSettings()
                const settingsData = settings.data as Settings[]
                setSettings(settingsData[0])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setLoading(false)
            }
        }

        fetchSettings()
    }, [])

    if (loading) return <Loader />
    return (
        <section className="grow space-y-3 z-50">
            <SingleBoxForm />
        </section>
    )
}
