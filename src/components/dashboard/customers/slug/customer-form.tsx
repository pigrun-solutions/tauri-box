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
import { createEditCustomerDetails } from '@/database/customers'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const CustomerForm = ({ initialData }: { initialData: Customer }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            address1: initialData.address1 || '',
            address2: initialData.address2 || '',
            address3: initialData.address3 || '',
            phone: initialData.phone || '',
            fax: initialData.fax || '',
            contact: initialData.contact || '',
        },
    })

    const onSubmit = async (values: z.infer<typeof customerSchema>) => {
        try {
            setLoading(true)

            if (initialData) await createEditCustomerDetails({ ...values, id: initialData.id })
            else await createEditCustomerDetails(values)

            navigate({ to: '/dashboard/customers' })
            toast.success('Customer saved successfully')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        form.reset({
            address1: initialData.address1 || '',
            address2: initialData.address2 || '',
            address3: initialData.address3 || '',
            phone: initialData.phone || '',
            fax: initialData.fax || '',
            contact: initialData.contact || '',
        })
    }, [initialData])

    return (
        <>
            <FormBreadcrumbs currentPage={initialData.name} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeader title={initialData.name} />
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="address1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="address1">Address</FormLabel>
                                            <FormControl>
                                                <Input id="address1" autoFocus className="w-full" disabled={loading} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="address2"></FormLabel>
                                            <FormControl>
                                                <Input id="address2" autoFocus className="w-full" disabled={loading} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="address2"></FormLabel>
                                            <FormControl>
                                                <Input id="address3" autoFocus className="w-full" disabled={loading} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="phone">Phone</FormLabel>
                                            <FormControl>
                                                <Input id="phone" autoFocus className="w-full" disabled={loading} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fax"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="fax">Fax</FormLabel>
                                            <FormControl>
                                                <Input id="fax" autoFocus className="w-full" disabled={loading} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="contact">Contact</FormLabel>
                                            <FormControl>
                                                <Input id="contact" autoFocus className="w-full" disabled={loading} {...field} />
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

export default CustomerForm
