import { toast } from 'sonner'
import { Settings } from '@/types/types'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { invoke } from '@tauri-apps/api/tauri'
import { getSettings } from '@/database/settings'
import { createFileRoute } from '@tanstack/react-router'
import { useSocketStore } from '@/zustand/socket-store'
import { useSettingsStore } from '@/zustand/settings-store'
import MultiBoxForm from '@/components/dashboard/multi-box-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/multi-box')({ component: () => <MultiBox /> })

const MultiBox = () => {
    const { setStatus } = useSocketStore()
    const { settings, setSettings } = useSettingsStore()

    const [effectLoading, setEffectLoading] = useState(true)
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getSettings()
                const settingsData = settings.data as Settings[]
                setSettings(settingsData[0])

                const check = await invoke('get_connection_status')
                if (check !== 'Disconnected') {
                    console.log('Disconnecting from server...')
                    await invoke<string>('disconnect_all_servers')
                    setStatus(false)
                }
            } catch (error) {
                toast.error('Server Error!')
                setStatus(false)
            } finally {
                setEffectLoading(false)
            }
        }

        if (!settings.lat) fetchSettings()
        else setEffectLoading(false)
    }, [])
    if (effectLoading) return <Loader />
    return (
        <section className="grow space-y-3 z-50">
            <MultiBoxForm />
        </section>
    )
}
