import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Settings } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSocketStore } from '@/zustand/socket-store'
import { createEditSettings } from '@/database/settings'
import settingsSchema from '@/lib/schemas/settingsSchema'
import { useSettingsStore } from '@/zustand/settings-store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

const SettingsModal = ({ onClose }: { onClose: () => void }) => {
    const { socket, reset } = useSocketStore()
    const { settings, setSettings } = useSettingsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: { id: settings?.id, ip: settings?.ip, lat: settings?.lat, long: settings?.long, port: settings?.port },
    })
    const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
        try {
            setLoading(true)

            const response = await createEditSettings(values)
            setSettings(response.data as Settings)

            socket?.close()
            reset()
            if (socket !== null) socket.OPEN

            onClose()

            toast.success('Settings saved!')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold capitalize tracking-tight sm:grow-0">Settings</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-4">
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="ip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="ip" className="whitespace-nowrap">
                                                IP Address
                                            </FormLabel>
                                            <Input id="ip" className="h-8" disabled={loading} {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="port"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="port" className="whitespace-nowrap">
                                                Port
                                            </FormLabel>
                                            <Input type="number" id="port" className="h-8" disabled={loading} {...field} onChange={e => form.setValue('port', Number(e.target.value))} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="lat" className="whitespace-nowrap">
                                                Latitude
                                            </FormLabel>
                                            <Input type="number" id="lat" className="h-8" disabled={loading} {...field} onChange={e => form.setValue('lat', Number(e.target.value))} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="long"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="long" className="whitespace-nowrap">
                                                Longitude
                                            </FormLabel>
                                            <Input type="number" id="long" className="h-8" disabled={loading} {...field} onChange={e => form.setValue('long', Number(e.target.value))} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-3 justify-end">
                            <Button type="button" variant="outline" size="sm" className="w-16">
                                Discard
                            </Button>
                            <Button type="submit" variant="default" size="sm" className="w-16">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SettingsModal
