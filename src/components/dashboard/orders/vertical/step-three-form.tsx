import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { OrderNozzle } from '@/types/types'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useBoltsStore } from '@/zustand/bolts-store'
import { useNozzleStore } from '@/zustand/nozzles-store'
import { useGasketsStore } from '@/zustand/gasket-store'
import { order3Schema } from '@/lib/schemas/orderSchemas'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { useSightGlassesStore } from '@/zustand/sightglasses-store'
import { ItemCombobox } from '../comboboxes/item-combobox'
import { BlindCombobox } from '../comboboxes/blind-combobox'
import { useVerticalStepThreeStore } from '@/zustand/vertical-orders-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FormItemsProps = {
    item: OrderNozzle
    index: number
    formDetails: OrderNozzle[]
    setFormDetails: React.Dispatch<React.SetStateAction<OrderNozzle[]>>
}

const FormItems = ({ item, index, formDetails, setFormDetails }: FormItemsProps) => {
    const { bolts } = useBoltsStore()
    const { nozzles } = useNozzleStore()
    const { gaskets } = useGasketsStore()
    const { sightGlasses } = useSightGlassesStore()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormDetails(prevFormDetails => {
            const updatedFormDetails = [...prevFormDetails]
            updatedFormDetails[index] = { ...updatedFormDetails[index], [name]: value }
            return updatedFormDetails
        })
    }

    const handleItemSelect = (id: string, type: string) => {
        setFormDetails(prevFormDetails => {
            const updatedFormDetails = [...prevFormDetails]
            updatedFormDetails[index][type as 'boltId' | 'nozId' | 'gasketId'] = id
            return updatedFormDetails
        })
    }

    const deleteVariant = () => setFormDetails(prevFormDetails => prevFormDetails.filter((_, i) => i !== index))

    return (
        <div className="grid grid-cols-10 gap-2">
            <Input type="text" placeholder="Reference" name="drawingRef" value={item.drawingRef} onChange={onChange} />
            <Input type="number" placeholder="Size" name="size" min={0} value={item.size} onChange={onChange} />
            <Input type="number" placeholder="Press" name="press" min={0} value={item.press} onChange={onChange} />
            <Input type="number" placeholder="Loc" name="loc" min={0} value={item.loc} onChange={onChange} />
            <Input type="number" placeholder="Orient" name="orient" min={0} max={360} value={item.orient} onChange={onChange} />

            <ItemCombobox items={nozzles} selected={formDetails[index].nozId} onItemSelected={id => handleItemSelect(id, 'nozId')} />
            <ItemCombobox items={bolts} selected={formDetails[index].boltId} onItemSelected={id => handleItemSelect(id, 'boltId')} />
            <ItemCombobox items={gaskets} selected={formDetails[index].gasketId} onItemSelected={id => handleItemSelect(id, 'gasketId')} />

            <BlindCombobox sightGlasses={sightGlasses} selected={formDetails[index].blind} onItemSelected={id => handleItemSelect(id, 'blind')} />

            <div className="flex items-center justify-center">
                <Button type="button" variant="ghost" onClick={deleteVariant} className="text-primary">
                    <CircleMinus className="size-4 text-destructive" />
                </Button>
            </div>
        </div>
    )
}

const StepThreeForm = () => {
    const navigate = useNavigate()
    const { stepThree, setStepThree } = useVerticalStepThreeStore()

    const [formDetails, setFormDetails] = useState<OrderNozzle[]>(stepThree.length > 0 ? stepThree : [])
    const form = useForm<z.infer<typeof order3Schema>>({
        resolver: zodResolver(order3Schema),
        defaultValues: { drawingRef: '', size: 0, press: 0, loc: 0, orient: 0, nozId: '', boltId: '', gasketId: '', blind: '' },
    })

    const addVariant = () => setFormDetails([...formDetails, { drawingRef: '', size: 0, press: 0, loc: 0, orient: 0, nozId: '', boltId: '', gasketId: '', blind: 'none' }])

    const onSubmit = async (_values: z.infer<typeof order3Schema>) => {
        setStepThree(formDetails)
        navigate({ to: '/dashboard/vertical/4' })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Vertical Tank Design & Estimating" />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Nozzle Table</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid grid-cols-10 gap-2 select-none text-center font-semibold text-sm">
                                <span>Drawing Reference</span>
                                <span>Size in.</span>
                                <span>Press psi.</span>
                                <span>Loc in.</span>
                                <span>Orient deg.</span>
                                <span>Noz Type</span>
                                <span>Bolt Type</span>
                                <span>Gasket Type</span>
                                <span>Blind/Sight</span>
                            </div>

                            <div className="grid gap-3">
                                {formDetails.map((item, index) => (
                                    <FormItems key={index} item={item} index={index} formDetails={formDetails} setFormDetails={setFormDetails} />
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
