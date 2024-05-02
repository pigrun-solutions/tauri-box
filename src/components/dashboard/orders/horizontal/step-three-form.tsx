import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { OrderNozzle } from '@/types/types'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { order3Schema } from '@/lib/schemas/orderSchemas'
// import { useStepThreeStore } from '@/zustand/orders-store'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const StepThreeForm = () => {
    // const navigate = useNavigate()
    // const { stepThree, setStepThree } = useStepThreeStore()
    const [formDetails, setFormDetails] = useState<OrderNozzle[]>([])

    const form = useForm<z.infer<typeof order3Schema>>({
        resolver: zodResolver(order3Schema),
        defaultValues: { drawingRef: '', size: 0, press: 0, loc: 0, orient: 0, nozId: '', boltId: '', gasketId: '', blind: '' },
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target
        const updatedList = formDetails.map((item, i) => (i === index ? { ...item, [name]: value } : item))
        setFormDetails(updatedList)
    }
    const deleteVariant = (index: number) => {
        const updatedList = formDetails.filter((_, i) => i !== index)
        setFormDetails(updatedList)
    }
    const addVariant = () => {
        setFormDetails([...formDetails, { drawingRef: '', size: 0, press: 0, loc: 0, orient: 0, nozId: '', boltId: '', gasketId: '', blind: '' }])
    }

    const onSubmit = async (_values: z.infer<typeof order3Schema>) => {
        console.log(formDetails)
        // navigate({ to: '/dashboard/horizontal/3' })
    }

    const FormItems = ({ item, index }: { item: OrderNozzle; index: number }) => {
        return (
            <div className="grid grid-cols-10 gap-2">
                <Input type="text" placeholder="Drawing Reference" name="drawingRef" defaultValue={item.drawingRef} onChange={e => onChange(e, index)} />
                <Input type="number" placeholder="Size" name="size" defaultValue={item.size} onChange={e => onChange(e, index)} />
                <Input type="number" placeholder="Press" name="press" defaultValue={item.press} onChange={e => onChange(e, index)} />
                <Input type="number" placeholder="Loc" name="loc" defaultValue={item.loc} onChange={e => onChange(e, index)} />
                <Input type="number" placeholder="Orient" name="orient" defaultValue={item.orient} onChange={e => onChange(e, index)} />
                <Input type="text" placeholder="Noz Type" name="nozId" defaultValue={item.nozId} onChange={e => onChange(e, index)} />
                <Input type="text" placeholder="Bolt Type" name="boltId" defaultValue={item.boltId} onChange={e => onChange(e, index)} />
                <Input type="text" placeholder="Gasket Type" name="gasketId" defaultValue={item.gasketId} onChange={e => onChange(e, index)} />
                <Input type="text" placeholder="Blind/Sight" name="blind" defaultValue={item.blind} onChange={e => onChange(e, index)} />
                <div className="flex items-center justify-center">
                    <Button type="button" variant="ghost" onClick={() => deleteVariant(index)} className="text-primary">
                        <CircleMinus className="size-4 text-destructive" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Horizontal Tank Design & Estimating" />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Nozzle Table</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid grid-cols-10 gap-2 select-none">
                                <span className="text-center font-semibold text-sm">Drawing Reference</span>
                                <span className="text-center font-semibold text-sm">Size in.</span>
                                <span className="text-center font-semibold text-sm">Press psi.</span>
                                <span className="text-center font-semibold text-sm">Loc in.</span>
                                <span className="text-center font-semibold text-sm">Orient deg.</span>
                                <span className="text-center font-semibold text-sm">Noz Type</span>
                                <span className="text-center font-semibold text-sm">Bolt Type</span>
                                <span className="text-center font-semibold text-sm">Gasket Type</span>
                                <span className="text-center font-semibold text-sm">Blind/Sight</span>
                                <span className="text-center font-semibold text-sm">Action</span>
                            </div>

                            <div className="grid gap-3">
                                {formDetails.map((item, index) => (
                                    <FormItems key={index} item={item} index={index} />
                                ))}
                            </div>

                            <div className="flex">
                                <Button type="button" onClick={addVariant} variant="ghost" className="w-full text-primary">
                                    <CirclePlus className="size-4 pr-1" />
                                    Add Variant
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default StepThreeForm
