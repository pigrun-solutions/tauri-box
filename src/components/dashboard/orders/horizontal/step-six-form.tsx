import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { CirclePlus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStepSixStore } from '@/zustand/orders-store'
import { order6Schema } from '@/lib/schemas/orderSchemas'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

const OtherCostItemsSection = ({ form, index, onChangeNumber }: { form: any; index: number; onChangeNumber: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
    return (
        <div className="grid grid-cols-12 gap-2">
            <FormField
                control={form.control}
                name={`otherCostItems.${index}.description`}
                render={({ field }) => (
                    <FormItem className="col-span-3">
                        <FormControl>
                            <Input type="string" id={`otherCostItems.${index}.description`} className="h-8" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`otherCostItems.${index}.itemCost`}
                render={({ field }) => (
                    <FormItem className="col-span-2">
                        <FormControl>
                            <Input type="number" id={`otherCostItems.${index}.itemCost`} className="h-8" {...field} onChange={onChangeNumber} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`otherCostItems.${index}.matCost`}
                render={({ field }) => (
                    <FormItem className="col-span-2">
                        <FormControl>
                            <Input type="number" id={`otherCostItems.${index}.matCost`} className="h-8" {...field} onChange={onChangeNumber} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`otherCostItems.${index}.wtLbs`}
                render={({ field }) => (
                    <FormItem className="col-span-2">
                        <FormControl>
                            <Input type="number" id={`otherCostItems.${index}.wtLbs`} className="h-8" {...field} onChange={onChangeNumber} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`otherCostItems.${index}.labHours`}
                render={({ field }) => (
                    <FormItem className="col-span-2">
                        <FormControl>
                            <Input type="number" id={`otherCostItems.${index}.labHours`} className="h-8" {...field} onChange={onChangeNumber} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="col-span-1 flex items-center justify-center">
                <Button
                    type="button"
                    onClick={() =>
                        form.setValue(
                            'otherCostItems',
                            form.getValues('otherCostItems').filter((_: any, i: number) => i !== index)
                        )
                    }
                    variant="ghost"
                    className="text-red-500">
                    <X className="size-4" />
                </Button>
            </div>
        </div>
    )
}
const OtherCostNoteSection = ({ form, index }: { form: any; index: number }) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            <FormField
                control={form.control}
                name={`otherCostNotes.${index}.note`}
                render={({ field }) => (
                    <FormItem className="col-span-3">
                        <FormControl>
                            <Input type="string" id={`otherCostNotes.${index}.note`} className="h-8" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="col-span-1 flex items-center justify-center">
                <Button
                    type="button"
                    onClick={() =>
                        form.setValue(
                            'otherCostNotes',
                            form.getValues('otherCostNotes').filter((_: any, i: number) => i !== index)
                        )
                    }
                    variant="ghost"
                    className="text-red-500">
                    <X className="size-4" />
                </Button>
            </div>
        </div>
    )
}

const StepSixForm = () => {
    const navigate = useNavigate()
    const { stepSix, setStepSix } = useStepSixStore()

    const form = useForm<z.infer<typeof order6Schema>>({
        resolver: zodResolver(order6Schema),
        defaultValues: { otherCostItems: stepSix.otherCostItems || [], otherCostNotes: stepSix.otherCostNotes || [] },
    })
    const onSubmit = async (values: z.infer<typeof order6Schema>) => {
        setStepSix(values)
        navigate({ to: '/dashboard/horizontal/1' })
    }

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = !e.target.value ? 0 : parseFloat(e.target.value)
        if (isNaN(value)) return
        const name = e.target.name

        form.setValue(name as any, Number(value.toFixed(2)))
    }
    const addItem = () => {
        const otherCostItems = form.getValues('otherCostItems')
        if (otherCostItems.length < 12) form.setValue('otherCostItems', [...otherCostItems, { description: '', itemCost: 0, labHours: 0, matCost: 0, wtLbs: 0 }])
    }
    const addNote = () => {
        const otherCostNotes = form.getValues('otherCostNotes')
        if (otherCostNotes.length < 7) form.setValue('otherCostNotes', [...otherCostNotes, { note: '' }])
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Other Cost Items" />

                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="grid grid-cols-12 gap-2 select-none text-center font-semibold text-sm">
                                <span className="col-span-3">Description</span>
                                <span className="col-span-2">Item $</span>
                                <span className="col-span-2">Mat $</span>
                                <span className="col-span-2">Wt. $</span>
                                <span className="col-span-2">Lab. Hrs.</span>
                                <span>Action</span>
                            </div>

                            {form.watch('otherCostItems').map((_, index) => (
                                <OtherCostItemsSection form={form} index={index} key={index} onChangeNumber={onChangeNumber} />
                            ))}

                            {form.watch('otherCostItems').length < 12 && (
                                <div className="flex">
                                    <Button type="button" onClick={addItem} variant="ghost" className="w-full text-primary">
                                        <CirclePlus className="size-4 pr-1" />
                                        Add Item
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="grid grid-cols-4 gap-2 select-none text-center font-semibold text-sm">
                                <span className="col-span-3 text-start">Notes</span>
                                <span>Action</span>
                            </div>

                            {form.watch('otherCostNotes').map((_, index) => (
                                <OtherCostNoteSection form={form} index={index} key={index} />
                            ))}

                            {form.watch('otherCostNotes').length < 7 && (
                                <div className="flex">
                                    <Button type="button" onClick={addNote} variant="ghost" className="w-full text-primary">
                                        <CirclePlus className="size-4 pr-1" />
                                        Add Note
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default StepSixForm
