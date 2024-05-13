import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import FormHeader from '@/components/ui/form-header'
// import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import multiBoxSchema from '@/lib/schemas/multiBoxSchema'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const MultiBoxForm = () => {
    // const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof multiBoxSchema>>({
        resolver: zodResolver(multiBoxSchema),
        defaultValues: { uidTo: 1, uidFrom: 0, psg: false, checkin: false, checkinTime: 0 },
    })

    const onSubmit = async (values: z.infer<typeof multiBoxSchema>) => {
        try {
            setLoading(true)

            console.log(values)

            toast.success('Started streaming')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <FormBreadcrumbs currentPage="Multi box" />

            <FormHeader title="Multi Box" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-4">
                    <Card className="">
                        <CardContent className="p-4">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="uidFrom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="uidFrom" className="whitespace-nowrap">
                                                            UID from
                                                        </FormLabel>
                                                        <Input type="number" id="uidFrom" min={0} className="h-8" disabled={loading} {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="uidTo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="uidTo" className="whitespace-nowrap">
                                                            UID to
                                                        </FormLabel>
                                                        <Input type="number" id="uidTo" min={0} className="h-8" disabled={loading} {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={form.control}
                                        name="checkin"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Checkin?</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch('checkin') && (
                                        <FormField
                                            control={form.control}
                                            name="checkinTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center gap-3">
                                                            <FormLabel htmlFor="checkinTime" className="whitespace-nowrap">
                                                                Checkin Timer
                                                            </FormLabel>
                                                            <Input type="number" id="checkinTime" className="h-8" disabled={loading} {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>

                                <FormField
                                    control={form.control}
                                    name="psg"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Passage?</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full" type="submit">
                                    Start streaming
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

export default MultiBoxForm
