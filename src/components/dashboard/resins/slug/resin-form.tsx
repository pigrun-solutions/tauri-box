'use client'
import { z } from 'zod'
import { toast } from 'sonner'
import { Resin } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { kgToLbs, lbsToKg } from '@/lib/utils'
import { createEditResin } from '@/database/resin'
import resinSchema from '@/lib/schemas/resinSchema'
import FormHeader from '@/components/ui/form-header'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const ResinForm = ({ initialData }: { initialData: Resin | undefined }) => {
    const navigate = useNavigate()
    const [costLbs, setCostLbs] = useState<number>(0.0)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof resinSchema>>({
        resolver: zodResolver(resinSchema),
        defaultValues: initialData ? initialData : { name: '', costKg: 0.0, densityGmCc: 1.0 },
    })

    const onSubmit = async (values: z.infer<typeof resinSchema>) => {
        try {
            setLoading(true)

            if (initialData) await createEditResin({ ...values, id: initialData.id })
            else await createEditResin(values)

            navigate({ to: '/dashboard/resins' })
            toast.success('Resin saved successfully')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onCostChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lbs' | 'kg') => {
        let value = parseFloat(e.target.value)
        value = Math.round(value * 100) / 100

        let result: number
        if (type === 'lbs') {
            result = lbsToKg(value)
            form.setValue('costKg', result.toFixed(2) as unknown as number)
            setCostLbs(value)
        } else {
            result = kgToLbs(value)
            form.setValue('costKg', value)
            setCostLbs(result.toFixed(2) as unknown as number)
        }
    }
    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value)
        value = Math.round(value * 100) / 100

        form.setValue(e.target.name as 'name' | 'costKg' | 'densityGmCc', value)
    }

    useEffect(() => {
        if (initialData) form.reset({ name: initialData.name, costKg: initialData.costKg, densityGmCc: initialData.densityGmCc })
        else form.reset({ name: '', costKg: 0.0, densityGmCc: 1.0 })

        setCostLbs(initialData ? (kgToLbs(initialData.costKg).toFixed(2) as unknown as number) : 0.0)
    }, [initialData])

    return (
        <>
            <FormBreadcrumbs currentPage={initialData ? initialData.name : 'Add'} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeader title={initialData ? initialData.name : 'Create Resin'} />
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="name">Name</FormLabel>
                                            <FormControl>
                                                <Input id="name" autoFocus placeholder="Electronics" className="w-full" {...field} disabled={loading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="costKg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="costKg">Cost $/kg</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="costKg"
                                                        type="number"
                                                        placeholder="0.00"
                                                        min={0}
                                                        step={0.01}
                                                        className="w-full"
                                                        {...field}
                                                        disabled={loading}
                                                        onChange={e => onCostChange(e, 'kg')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2">
                                        <Label htmlFor="costLbs">Cost $/lbs</Label>
                                        <Input
                                            min={0}
                                            id="costLbs"
                                            type="number"
                                            value={costLbs}
                                            className="w-full"
                                            step={0.01}
                                            placeholder="0.00"
                                            disabled={loading}
                                            onChange={e => onCostChange(e, 'lbs')}
                                        />
                                    </div>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="densityGmCc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="densityGmCc">Density gm/cc</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="densityGmCc"
                                                    type="number"
                                                    placeholder="0.00"
                                                    step={0.01}
                                                    min={1}
                                                    className="w-full"
                                                    {...field}
                                                    onChange={onNumberChange}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default ResinForm
