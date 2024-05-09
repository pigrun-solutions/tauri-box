import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ManwaySizes } from '@/config/horizontal'
import { useNavigate } from '@tanstack/react-router'
import { useBoltsStore } from '@/zustand/bolts-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useGasketsStore } from '@/zustand/gasket-store'
import { useManwayStore } from '@/zustand/manways-store'
import { order4Schema } from '@/lib/schemas/orderSchemas'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { Bolt, Gasket, Manway, ManwayTable } from '@/types/types'
import { ItemCombobox } from '../comboboxes/item-combobox'
import { useVerticalStepFourStore } from '@/zustand/vertical-orders-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FormItemsProps = {
    index: number
    bolts: Bolt[]
    item: ManwayTable
    gaskets: Gasket[]
    manways: Manway[]
    formDetails: ManwayTable[]
    setFormDetails: React.Dispatch<React.SetStateAction<ManwayTable[]>>
}

const FormItems = ({ item, index, bolts, gaskets, manways, formDetails, setFormDetails }: FormItemsProps) => {
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
            updatedFormDetails[index][type as 'boltId' | 'manwayId' | 'gasketId'] = id
            return updatedFormDetails
        })
    }

    const deleteVariant = () => setFormDetails(prevFormDetails => prevFormDetails.filter((_, i) => i !== index))

    return (
        <div className="grid grid-cols-10 gap-2">
            <Input type="text" placeholder="Reference" name="drawingRef" value={item.drawingRef} onChange={onChange} />
            <ItemCombobox items={manways} selected={formDetails[index].manwayId} onItemSelected={id => handleItemSelect(id, 'manwayId')} />

            <ItemCombobox items={ManwaySizes} selected={formDetails[index].size} onItemSelected={id => handleItemSelect(id, 'size')} />

            <Input type="number" placeholder="Loc" name="loc" min={0} value={item.loc} onChange={onChange} />
            <Input type="number" placeholder="Orient" name="orient" min={0} max={360} value={item.orient} onChange={onChange} />

            <ItemCombobox items={bolts} selected={formDetails[index].boltId} onItemSelected={id => handleItemSelect(id, 'boltId')} />
            <ItemCombobox items={gaskets} selected={formDetails[index].gasketId} onItemSelected={id => handleItemSelect(id, 'gasketId')} />
            <ItemCombobox
                items={[
                    { id: 'none', name: 'none' },
                    { id: 'hinge', name: 'hinge' },
                    { id: 'davit', name: 'davit' },
                ]}
                selected={formDetails[index].hinge}
                onItemSelected={id => handleItemSelect(id, 'hinge')}
            />

            <div className="flex items-center justify-center">
                <Button type="button" variant="ghost" onClick={deleteVariant} className="text-primary">
                    <CircleMinus className="size-4 text-destructive" />
                </Button>
            </div>
        </div>
    )
}

const StepFourForm = () => {
    const navigate = useNavigate()
    const { stepFour, setStepFour } = useVerticalStepFourStore()

    const { bolts } = useBoltsStore()
    const { manways } = useManwayStore()
    const { gaskets } = useGasketsStore()

    const [formDetails, setFormDetails] = useState<ManwayTable[]>(stepFour.length > 0 ? stepFour : [])
    const form = useForm<z.infer<typeof order4Schema>>({
        resolver: zodResolver(order4Schema),
        defaultValues: { drawingRef: '', manwayId: '', size: 0, loc: 0, orient: 0, boltId: '', gasketId: '', hinge: 'none' },
    })

    const addVariant = () =>
        setFormDetails([
            ...formDetails,
            {
                drawingRef: '',
                manwayId: (manways.length > 0 && manways[0].id) || '',
                size: '20',
                loc: 0,
                orient: 0,
                boltId: (bolts.length > 0 && bolts[0].id) || '',
                gasketId: (gaskets.length > 0 && gaskets[0].id) || '',
                hinge: 'none',
            },
        ])

    const onSubmit = async (_values: z.infer<typeof order4Schema>) => {
        setStepFour(formDetails)
        navigate({ to: '/dashboard/vertical/5' })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Vertical Tank Design & Estimating" />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Manway Table</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid grid-cols-10 gap-2 select-none text-center font-semibold text-sm">
                                <span>Drawing Reference</span>
                                <span>Type</span>
                                <span>Size in.</span>
                                <span>Loc in.</span>
                                <span>Orient deg.</span>
                                <span>Bolt Type</span>
                                <span>Gasket Type</span>
                                <span>Hinge/Davit</span>
                            </div>

                            <div className="grid gap-3">
                                {formDetails.map((item, index) => (
                                    <FormItems key={index} item={item} index={index} bolts={bolts} manways={manways} gaskets={gaskets} formDetails={formDetails} setFormDetails={setFormDetails} />
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

export default StepFourForm
