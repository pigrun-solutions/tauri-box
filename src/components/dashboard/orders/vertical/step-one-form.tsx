import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { order1Schema } from '@/lib/schemas/orderSchemas'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { useVerticalStepOneStore } from '@/zustand/vertical-orders-store'
import { CustomerCombobox } from '../horizontal/comboboxes/customer-combobox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const StepOneForm = () => {
    const navigate = useNavigate()
    const { stepOne, setStepOne } = useVerticalStepOneStore()

    const form = useForm<z.infer<typeof order1Schema>>({
        resolver: zodResolver(order1Schema),
        defaultValues: {
            date: stepOne.date || '',
            reference: stepOne.reference || '',
            rfq: stepOne.rfq || '',

            customerName: stepOne.customerName || '',
            customerAddress1: stepOne.customerAddress1 || '',
            customerAddress2: stepOne.customerAddress2 || '',
            customerAddress3: stepOne.customerAddress3 || '',
            customerPhone: stepOne.customerPhone || '',
            customerFax: stepOne.customerFax || '',
            customerContact: stepOne.customerContact || '',
            customerContactPhone: stepOne.customerContactPhone || '',

            dwgName: stepOne.dwgName || '',
            dwgNo: stepOne.dwgNo || '',
        },
    })

    const onSubmit = async (values: z.infer<typeof order1Schema>) => {
        setStepOne(values)
        navigate({ to: '/dashboard/vertical/2' })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Horizontal Tank Design & Estimating" />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="date" className="whitespace-nowrap">
                                                Date
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="date" type="date" className="w-full h-8" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="reference"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="reference" className="whitespace-nowrap">
                                                Reference
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="reference" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rfq"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="rfq" className="whitespace-nowrap">
                                                RFQ Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="rfq" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid gap-3">
                                <div>
                                    <CustomerCombobox form={form} />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="customerName"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="customerName" className="whitespace-nowrap">
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="customerName" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="customerAddress1"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="customerAddress1" className="whitespace-nowrap">
                                                Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="customerAddress1" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="customerAddress2"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <Input id="customerAddress2" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="customerAddress3"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <Input id="customerAddress3" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="customerPhone"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="customerPhone" className="whitespace-nowrap">
                                                Phone
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="customerPhone" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="customerFax"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="customerFax" className="whitespace-nowrap">
                                                Fax
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="customerFax" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="customerContact"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="customerContact" className="whitespace-nowrap">
                                                Contact
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="customerContact" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="customerContactPhone"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="customerContactPhone" className="whitespace-nowrap">
                                                Contact Phone
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="customerContactPhone" className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Other</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="dwgName"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="dwgName" className="whitespace-nowrap">
                                                Dwg. Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="dwgName" className="w-full h-8" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dwgNo"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3">
                                            <FormLabel htmlFor="dwgNo" className="whitespace-nowrap">
                                                Dwg. No.
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="dwgNo" className="w-full" {...field} />
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

export default StepOneForm
