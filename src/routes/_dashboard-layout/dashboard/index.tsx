import React from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Ellipsis } from 'lucide-react'
import { Settings } from '@/types/types'
import Modal from '@/components/ui/modal'
import { Box, Boxes } from 'lucide-react'
import Loader from '@/components/ui/loader'
import { Card } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { getSettings } from '@/database/settings'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { useSettingsStore } from '@/zustand/settings-store'
import SettingsModal from '@/components/dashboard/settings-modal'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/dashboard/')({ component: () => <Dashboard /> })

const Dashboard = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false)

    const { setSettings } = useSettingsStore()
    const [effectLoading, setEffectLoading] = React.useState(true)
    React.useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getSettings()
                const settingsData = settings.data as Settings[]
                setSettings(settingsData[0])
            } catch (error) {
                toast.error('Server Error!')
            } finally {
                setEffectLoading(false)
            }
        }

        fetchSettings()
    }, [])
    if (effectLoading) return <Loader />

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="flex justify-between">
                <Heading title="Patrack Box" />

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button type="button" variant="outline" size="icon" className="ml-auto" onClick={() => setIsOpen(true)}>
                        <Ellipsis className="size-4" />
                    </Button>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <SettingsModal onClose={() => setIsOpen(false)} />
                    </Modal>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card
                    className={cn('hover:bg-muted-foreground/10 aspect-square cursor-pointer grid place-items-center h-full active:scale-95 transition-all')}
                    onClick={() => navigate({ to: '/dashboard/single-box' })}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <Box className="size-12" />
                        <h4 className="font-semibold text-xl">Single Box</h4>
                    </div>
                </Card>
                <Card
                    className={cn('hover:bg-muted-foreground/10 aspect-square cursor-pointer grid place-items-center h-full active:scale-95 transition-all')}
                    onClick={() => navigate({ to: '/dashboard/multi-box' })}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <Boxes className="size-12" />
                        <h4 className="font-semibold text-xl">Multiple Boxes</h4>
                    </div>
                </Card>
            </div>
        </div>
    )
}
