import { z } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from '@tanstack/react-router'
import { IdCombobox } from './comboboxes/id-combobox'
import { useResinStore } from '@/zustand/resin-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { order2Schema } from '@/lib/schemas/orderSchemas'
import { useLaminateStore } from '@/zustand/laminate-store'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { useStepTwoStore } from '@/zustand/horizontal-orders-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HorizontalCorrLinear, HorizontalHeads, HorizontalSeismic } from '@/config/horizontal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const StepTwoForm = () => {
    const navigate = useNavigate()
    const { resin } = useResinStore()
    const { laminates } = useLaminateStore()

    const { stepTwo, setStepTwo } = useStepTwoStore()

    const form = useForm<z.infer<typeof order2Schema>>({
        resolver: zodResolver(order2Schema),
        defaultValues: {
            resinId: stepTwo.resinId || (resin.length > 0 && Number(resin[0].id)) || undefined,
            corrLinear: stepTwo.corrLinear || 'yes',

            shellInternalDiam: stepTwo.shellInternalDiam || 0,
            shellLength: stepTwo.shellLength || 0,
            shellJoint1: stepTwo.shellJoint1 || 0,
            shellJoint2: stepTwo.shellJoint2 || 0,
            shellJoint3: stepTwo.shellJoint3 || 0,
            shellJoint4: stepTwo.shellJoint4 || 0,
            shellJoint5: stepTwo.shellJoint5 || 0,
            shellJoint6: stepTwo.shellJoint6 || 0,
            shellLaminateId: stepTwo.shellLaminateId || (laminates.length > 0 && Number(laminates[0].id)) || undefined,
            shellLaminateMinThk: stepTwo.shellLaminateMinThk || 0,

            headType: stepTwo.headType || 'Conical',
            headHeight: stepTwo.headHeight || 0,
            headLaminateId: stepTwo.headLaminateId || (laminates.length > 0 && Number(laminates[0].id)) || undefined,
            headLaminateMinThk: stepTwo.headLaminateMinThk || 0,

            saddleHeight: stepTwo.saddleHeight || 0,
            saddleWidth: stepTwo.saddleWidth || 0,
            saddleLaminateId: stepTwo.saddleLaminateId || (laminates.length > 0 && Number(laminates[0].id)) || undefined,
            saddleLaminateMinThk: stepTwo.saddleLaminateMinThk || 0,

            bodyFlange: stepTwo.bodyFlange || 'no',
            bodyFlangeLocation1: stepTwo.bodyFlangeLocation1 || 0,
            bodyFlangeLocation2: stepTwo.bodyFlangeLocation2 || 0,
            bodyFlangeLocation3: stepTwo.bodyFlangeLocation3 || 0,
            bodyFlangeLocation4: stepTwo.bodyFlangeLocation4 || 0,
            bodyFlangeLocation5: stepTwo.bodyFlangeLocation5 || 0,
            bodyFlangeLocation6: stepTwo.bodyFlangeLocation6 || 0,

            liquidDensity: stepTwo.liquidDensity || 0,
            pressure: stepTwo.pressure || 0,
            vacuum: stepTwo.vacuum || 0,
            vacuumBuckle: stepTwo.vacuumBuckle || 5,
            snowLoad: stepTwo.snowLoad || 0,
            wind: stepTwo.wind || 0,

            seismic: stepTwo.seismic || '0',
        },
    })

    const onSubmit = async (values: z.infer<typeof order2Schema>) => {
        setStepTwo(values)
        navigate({ to: '/dashboard/horizontal/3' })
    }

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = !e.target.value ? 0 : parseFloat(e.target.value)
        if (isNaN(value)) return
        const name = e.target.name

        form.setValue(name as any, Number(value.toFixed(2)))
    }
    const handleItemSelect = (id: string, type: string) => {
        form.setValue(type as any, id)
    }

    useEffect(() => {
        if (form.watch('shellJoint1') === 0) {
            form.setValue('shellJoint2', 0)
            form.setValue('shellJoint3', 0)
            form.setValue('shellJoint4', 0)
            form.setValue('shellJoint5', 0)
            form.setValue('shellJoint6', 0)
        }
        if (form.watch('shellJoint2') === 0) {
            form.setValue('shellJoint3', 0)
            form.setValue('shellJoint4', 0)
            form.setValue('shellJoint5', 0)
            form.setValue('shellJoint6', 0)
        }
        if (form.watch('shellJoint3') === 0) {
            form.setValue('shellJoint4', 0)
            form.setValue('shellJoint5', 0)
            form.setValue('shellJoint6', 0)
        }
        if (form.watch('shellJoint4') === 0) {
            form.setValue('shellJoint5', 0)
            form.setValue('shellJoint6', 0)
        }
        if (form.watch('shellJoint5') === 0) form.setValue('shellJoint6', 0)
    }, [form.watch('shellJoint1'), form.watch('shellJoint2'), form.watch('shellJoint3'), form.watch('shellJoint4'), form.watch('shellJoint5')])
    useEffect(() => {
        if (form.watch('bodyFlangeLocation1') === 0) {
            form.setValue('bodyFlangeLocation2', 0)
            form.setValue('bodyFlangeLocation3', 0)
            form.setValue('bodyFlangeLocation4', 0)
            form.setValue('bodyFlangeLocation5', 0)
            form.setValue('bodyFlangeLocation6', 0)
        }
        if (form.watch('bodyFlangeLocation2') === 0) {
            form.setValue('bodyFlangeLocation3', 0)
            form.setValue('bodyFlangeLocation4', 0)
            form.setValue('bodyFlangeLocation5', 0)
            form.setValue('bodyFlangeLocation6', 0)
        }
        if (form.watch('bodyFlangeLocation3') === 0) {
            form.setValue('bodyFlangeLocation4', 0)
            form.setValue('bodyFlangeLocation5', 0)
            form.setValue('bodyFlangeLocation6', 0)
        }
        if (form.watch('bodyFlangeLocation4') === 0) {
            form.setValue('bodyFlangeLocation5', 0)
            form.setValue('bodyFlangeLocation6', 0)
        }
        if (form.watch('bodyFlangeLocation5') === 0) form.setValue('bodyFlangeLocation6', 0)
    }, [form.watch('bodyFlangeLocation1'), form.watch('bodyFlangeLocation2'), form.watch('bodyFlangeLocation3'), form.watch('bodyFlangeLocation4'), form.watch('bodyFlangeLocation5')])

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Horizontal Tank Data" />

                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 grid gap-3">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="shellLaminateId" className="w-32">
                                    Resin
                                </Label>
                                <IdCombobox className="w-52 h-8" items={resin} selected={form.watch('resinId')} onItemSelected={id => handleItemSelect(id, 'resinId')} />
                                {form.formState.errors.resinId && <span className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.resinId.message}</span>}
                            </div>

                            <FormField
                                control={form.control}
                                name="corrLinear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="corrLinear" className="w-32 whitespace-nowrap">
                                                    Include corr linear
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl className="capitalize font-semibold w-52">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="capitalize">
                                                        {HorizontalCorrLinear.map(item => (
                                                            <SelectItem key={item} value={item}>
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shell</CardTitle>
                        </CardHeader>

                        <CardContent className="p-6 pt-0 grid gap-3">
                            <FormField
                                control={form.control}
                                name="shellInternalDiam"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="shellInternalDiam" className="w-32">
                                                    Internal diameter
                                                </FormLabel>
                                                <Input type="number" step=".01" id="shellInternalDiam" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">in</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="shellLength"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <FormLabel htmlFor="shellLength" className="w-32">
                                                        Length
                                                    </FormLabel>
                                                    <Input type="number" step=".01" id="shellLength" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">in</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-7 gap-8 items-center pb-4">
                                    <Label htmlFor="shellLength" className="w-full flex justify-end">
                                        Joint Locations
                                    </Label>
                                    <FormField
                                        control={form.control}
                                        name="shellJoint1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="number" step=".01" id="shellJoint1" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch('shellJoint1') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="shellJoint2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="shellJoint2" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('shellJoint2') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="shellJoint3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="shellJoint3" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('shellJoint3') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="shellJoint4"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="shellJoint4" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('shellJoint4') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="shellJoint5"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="shellJoint5" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('shellJoint5') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="shellJoint6"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="shellJoint6" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="shellLaminateId" className="w-32">
                                        Wall Laminate
                                    </Label>
                                    <IdCombobox className="w-52 h-8" items={laminates} selected={form.watch('shellLaminateId')} onItemSelected={id => handleItemSelect(id, 'shellLaminateId')} />
                                    {form.formState.errors.shellLaminateId && <span className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.shellLaminateId.message}</span>}
                                </div>

                                <div className="flex ml-14 items-center">
                                    <FormField
                                        control={form.control}
                                        name="shellLaminateMinThk"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center">
                                                        <FormLabel htmlFor="shellLaminateMinThk" className="w-full whitespace-nowrap">
                                                            Min Thickness
                                                        </FormLabel>
                                                        <Input type="number" step=".01" id="shellLaminateMinThk" min={0} className="w- h-8" {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm ml-4">in</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Head</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid gap-3">
                            <FormField
                                control={form.control}
                                name="headType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="headType" className="w-32 whitespace-nowrap">
                                                    Type
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl className="capitalize font-semibold w-52">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="capitalize">
                                                        {HorizontalHeads.map(item => (
                                                            <SelectItem key={item.name} value={item.name}>
                                                                {item.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="headHeight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="headHeight" className="w-32">
                                                    Height
                                                </FormLabel>
                                                <Input
                                                    type="number"
                                                    step=".01"
                                                    id="headHeight"
                                                    min={0}
                                                    disabled={form.watch('headType') !== 'Conical'}
                                                    className="w-52 h-8"
                                                    {...field}
                                                    onChange={onChangeNumber}
                                                />
                                                <span className="font-semibold text-sm">in</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="headLaminateId" className="w-32">
                                        Head Laminate
                                    </Label>
                                    <IdCombobox className="w-52 h-8" items={laminates} selected={form.watch('headLaminateId')} onItemSelected={id => handleItemSelect(id, 'headLaminateId')} />
                                    {form.formState.errors.headLaminateId && <span className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.headLaminateId.message}</span>}
                                </div>

                                <div className="flex ml-14 items-center">
                                    <FormField
                                        control={form.control}
                                        name="headLaminateMinThk"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center">
                                                        <FormLabel htmlFor="headLaminateMinThk" className="w-full whitespace-nowrap">
                                                            Min Thickness
                                                        </FormLabel>
                                                        <Input type="number" step=".01" id="headLaminateMinThk" min={0} className="w- h-8" {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm ml-4">in</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Saddle</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid gap-3">
                            <FormField
                                control={form.control}
                                name="saddleHeight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="saddleHeight" className="w-32">
                                                    Height
                                                </FormLabel>
                                                <Input type="number" step=".01" id="saddleHeight" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">in</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="saddleWidth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="saddleWidth" className="w-32">
                                                    Width
                                                </FormLabel>
                                                <Input type="number" step=".01" id="saddleWidth" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">in</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="saddleLaminateId" className="w-32">
                                        Saddle Laminate
                                    </Label>
                                    <IdCombobox className="w-52 h-8" items={laminates} selected={form.watch('saddleLaminateId')} onItemSelected={id => handleItemSelect(id, 'saddleLaminateId')} />
                                    {form.formState.errors.saddleLaminateId && <span className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.saddleLaminateId.message}</span>}
                                </div>

                                <div className="flex ml-14 items-center">
                                    <FormField
                                        control={form.control}
                                        name="saddleLaminateMinThk"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center">
                                                        <FormLabel htmlFor="saddleLaminateMinThk" className="w-full whitespace-nowrap">
                                                            Min Thickness
                                                        </FormLabel>
                                                        <Input type="number" step=".01" id="saddleLaminateMinThk" min={0} className="h-8" {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm ml-4">in</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Body</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid gap-3">
                            <FormField
                                control={form.control}
                                name="bodyFlange"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="bodyFlange" className="w-32 whitespace-nowrap">
                                                    Body Flange
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={'no'}>
                                                    <FormControl className="capitalize font-semibold w-52">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="capitalize">
                                                        <SelectItem key="yes" value="yes">
                                                            Yes
                                                        </SelectItem>
                                                        <SelectItem key="no" value="no">
                                                            No
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.watch('bodyFlange') === 'yes' && (
                                <div className="grid grid-cols-7 gap-8 items-center pb-4">
                                    <Label htmlFor="bodyFlange" className="w-full flex justify-end">
                                        Flange Locations
                                    </Label>
                                    <FormField
                                        control={form.control}
                                        name="bodyFlangeLocation1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="number" step=".01" id="bodyFlangeLocation1" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch('bodyFlangeLocation1') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="bodyFlangeLocation2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="bodyFlangeLocation2" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('bodyFlangeLocation2') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="bodyFlangeLocation3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="bodyFlangeLocation3" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('bodyFlangeLocation3') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="bodyFlangeLocation4"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="bodyFlangeLocation4" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('bodyFlangeLocation4') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="bodyFlangeLocation5"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="bodyFlangeLocation5" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {form.watch('bodyFlangeLocation5') > 0 && (
                                        <FormField
                                            control={form.control}
                                            name="bodyFlangeLocation6"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step=".01" id="bodyFlangeLocation6" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Other</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid gap-3">
                            <FormField
                                control={form.control}
                                name="liquidDensity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="liquidDensity" className="w-32">
                                                    Liquid Density
                                                </FormLabel>
                                                <Input type="number" step=".01" id="liquidDensity" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="pressure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="pressure" className="w-32">
                                                    Int. Pressure
                                                </FormLabel>
                                                <Input type="number" step=".01" id="pressure" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">psi</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="vacuum"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <FormLabel htmlFor="vacuum" className="w-32">
                                                        Vacuum
                                                    </FormLabel>
                                                    <Input type="number" step=".01" id="vacuum" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">in H2O</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex ml-14 items-center">
                                    <FormField
                                        control={form.control}
                                        name="vacuumBuckle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center">
                                                        <FormLabel htmlFor="vacuumBuckle" className="w-full whitespace-nowrap">
                                                            Vacuum Buckle
                                                        </FormLabel>
                                                        <Input type="number" step=".01" id="vacuumBuckle" min={0} className="h-8" {...field} onChange={onChangeNumber} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="snowLoad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="snowLoad" className="w-32">
                                                    Snow Load
                                                </FormLabel>
                                                <Input type="number" step=".01" id="snowLoad" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">psf</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="wind"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="wind" className="w-32">
                                                    Wind
                                                </FormLabel>
                                                <Input type="number" step=".01" id="wind" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">psf</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="seismic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="seismic" className="w-32 whitespace-nowrap">
                                                    Seismic
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue="0">
                                                    <FormControl className="capitalize font-semibold w-52">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="capitalize">
                                                        {HorizontalSeismic.map(item => (
                                                            <SelectItem key={item.name} value={item.name}>
                                                                {item.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Drawing <Card className="w-fit min-w-[200px] top-12 right-4 h-fit p-6 absolute">
                        <div className={`w-full rounded-full border bg-blue-900`} style={{ height: form.watch('shellLength') + 'px' }} />
                    </Card> */}
                </form>
            </Form>
        </>
    )
}

export default StepTwoForm
