import { z } from 'zod'
import { toast } from 'sonner'
import { Customer } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import FormHeader from '@/components/ui/form-header'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import customerSchema from '@/lib/schemas/customerSchema'

import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createEditCustomer } from '@/database/customers'

const CustomerForm = ({ initialData }: { initialData: Customer | undefined }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema),
        defaultValues: initialData ? initialData : { name: '', email: '', phone: '', fax: '', contact: '', address: '' },
    })

    const onSubmit = async (values: z.infer<typeof customerSchema>) => {
        try {
            setLoading(true)

            if (initialData) await createEditCustomer({ ...values, id: initialData.id })
            else await createEditCustomer(values)

            navigate({ to: '/dashboard/additives' })
            toast.success('Additive saved successfully')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (initialData) form.reset(initialData)
        else form.reset({ name: '', email: '', phone: '', fax: '', contact: '', address: '' })
    }, [initialData])

    return (
        <>
            <FormBreadcrumbs currentPage={initialData ? initialData.name : 'Add'} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeader title={initialData ? initialData.name : 'Create Additive'} />
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

                                <div className="grid grid-cols-2 gap-4"></div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default CustomerForm
