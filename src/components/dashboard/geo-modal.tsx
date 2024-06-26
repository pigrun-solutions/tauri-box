import { z } from 'zod'
import { toast } from 'sonner'
import Modal from '../ui/modal'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import { Settings } from '@/types/types'
import { useForm } from 'react-hook-form'
import geoSchema from '@/lib/schemas/geoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEditLatLong } from '@/database/settings'
import { useSettingsStore } from '@/zustand/settings-store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

const GeoForm = ({ onClose }: { onClose: () => void }) => {
    const { settings, setSettings } = useSettingsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof geoSchema>>({
        resolver: zodResolver(geoSchema),
        defaultValues: {
            id: settings?.id,
            lat: settings?.lat,
            long: settings?.long,
            coilFreq: settings?.coilFreq,
            geoFreq: settings?.geoFreq,
            duration: settings?.duration,
        },
    })

    const onSubmit = async (values: z.infer<typeof geoSchema>) => {
        try {
            setLoading(true)

            const response = await createEditLatLong(values)
            setSettings(response.data as Settings)

            onClose()

            toast.success('Geo saved!')
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

                        <FormField
                            control={form.control}
                            name="coilFreq"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="coilFreq" className="whitespace-nowrap">
                                                Coil Frequency
                                            </FormLabel>
                                            <Input type="number" id="coilFreq" className="h-8" disabled={loading} {...field} onChange={e => form.setValue('coilFreq', Number(e.target.value))} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="geoFreq"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="geoFreq" className="whitespace-nowrap">
                                                Geo Frequency
                                            </FormLabel>
                                            <Input type="number" id="geoFreq" className="h-8" disabled={loading} {...field} onChange={e => form.setValue('geoFreq', Number(e.target.value))} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <FormLabel htmlFor="duration" className="whitespace-nowrap">
                                                Duration
                                            </FormLabel>
                                            <Input type="number" id="duration" className="h-8" disabled={loading} {...field} onChange={e => form.setValue('duration', Number(e.target.value))} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-3 justify-end">
                            <Button type="button" variant="outline" size="sm" className="w-16" onClick={onClose}>
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

const GeoModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" className="ml-auto" onClick={() => setIsOpen(true)}>
                <Ellipsis className="size-4" />
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <GeoForm onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    )
}

export default GeoModal
