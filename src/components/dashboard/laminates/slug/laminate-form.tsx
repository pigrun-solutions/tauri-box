import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import FormHeader from '@/components/ui/form-header'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Glass, LaminateDetails } from '@/types/types'
import { Card, CardContent } from '@/components/ui/card'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { createEditLaminateDetails } from '@/database/laminates'
import laminateDetailsSchema from '@/lib/schemas/laminateDetailsSchema'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const LaminateForm = ({ initialData, glass, name, laminateId }: { initialData: LaminateDetails; glass: Glass[] | undefined; laminateId: string; name: string | undefined }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof laminateDetailsSchema>>({
        resolver: zodResolver(laminateDetailsSchema),
        defaultValues: {
            atsLinear: initialData.atsLinear || 100,
            atsNonLinear: initialData.atsNonLinear || 100,
            afsLinear: initialData.afsLinear || 100,
            afsNonLinear: initialData.afsNonLinear || 100,
            atmLinear: initialData.atmLinear || 1000,
            atmNonLinear: initialData.atmNonLinear || 1000,
            afmLinear: initialData.afmLinear || 1000,
            afmNonLinear: initialData.afmNonLinear || 1000,
            htsLinear: initialData.htsLinear || 100,
            htsNonLinear: initialData.htsNonLinear || 100,
            hfsLinear: initialData.hfsLinear || 100,
            hfsNonLinear: initialData.hfsNonLinear || 100,
            htmLinear: initialData.htmLinear || 1000,
            htmNonLinear: initialData.htmNonLinear || 1000,
            hfmLinear: initialData.hfmLinear || 1000,
            hfmNonLinear: initialData.hfmNonLinear || 1000,
            issLinear: initialData.issLinear || 30,
            issNonLinear: initialData.issNonLinear || 30,
            mtLinear: initialData.mtLinear || 0.0,
            mtNonLinear: initialData.mtNonLinear || 0.0,
            layupRate: initialData.layupRate || 1.0,
            clrName1: initialData.clrName1 || '',
            clrName2: initialData.clrName2 || '',
            clrOz1: initialData.clrOz1 || 0,
            clrOz2: initialData.clrOz2 || 0,
            swrName1: initialData.swrName1 || '',
            swrName2: initialData.swrName2 || '',
            swrName3: initialData.swrName3 || '',
            swrName4: initialData.swrName4 || '',
            swrOz1: initialData.swrOz1 || 0,
            swrOz2: initialData.swrOz2 || 0,
            swrOz3: initialData.swrOz3 || 0,
            swrOz4: initialData.swrOz4 || 0,
        },
    })

    const onSubmit = async (values: z.infer<typeof laminateDetailsSchema>) => {
        try {
            setLoading(true)

            if (values.clrName1 === 'emptyme') values.clrName1 = ''
            if (values.clrName2 === 'emptyme') values.clrName2 = ''
            if (values.swrName1 === 'emptyme') values.swrName1 = ''
            if (values.swrName2 === 'emptyme') values.swrName2 = ''
            if (values.swrName3 === 'emptyme') values.swrName3 = ''
            if (values.swrName4 === 'emptyme') values.swrName4 = ''

            if (initialData) await createEditLaminateDetails({ ...values, id: initialData.id }, laminateId)
            else await createEditLaminateDetails(values, laminateId)

            navigate({ to: '/dashboard/laminates' })
            toast.success('Laminate saved successfully')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        form.reset({
            atsLinear: initialData.atsLinear || 100,
            atsNonLinear: initialData.atsNonLinear || 100,
            afsLinear: initialData.afsLinear || 100,
            afsNonLinear: initialData.afsNonLinear || 100,
            atmLinear: initialData.atmLinear || 1000,
            atmNonLinear: initialData.atmNonLinear || 1000,
            afmLinear: initialData.afmLinear || 1000,
            afmNonLinear: initialData.afmNonLinear || 1000,
            htsLinear: initialData.htsLinear || 100,
            htsNonLinear: initialData.htsNonLinear || 100,
            hfsLinear: initialData.hfsLinear || 100,
            hfsNonLinear: initialData.hfsNonLinear || 100,
            htmLinear: initialData.htmLinear || 1000,
            htmNonLinear: initialData.htmNonLinear || 1000,
            hfmLinear: initialData.hfmLinear || 1000,
            hfmNonLinear: initialData.hfmNonLinear || 1000,
            issLinear: initialData.issLinear || 30,
            issNonLinear: initialData.issNonLinear || 30,
            mtLinear: initialData.mtLinear || 0.0,
            mtNonLinear: initialData.mtNonLinear || 0.0,
            layupRate: initialData.layupRate || 1.0,
            clrName1: initialData.clrName1 || '',
            clrName2: initialData.clrName2 || '',
            clrOz1: initialData.clrOz1 || 0,
            clrOz2: initialData.clrOz2 || 0,
            swrName1: initialData.swrName1 || '',
            swrName2: initialData.swrName2 || '',
            swrName3: initialData.swrName3 || '',
            swrName4: initialData.swrName4 || '',
            swrOz1: initialData.swrOz1 || 0,
            swrOz2: initialData.swrOz2 || 0,
            swrOz3: initialData.swrOz3 || 0,
            swrOz4: initialData.swrOz4 || 0,
        })
    }, [initialData])

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const oners = ['mtLinear', 'mtNonLinear', 'layupRate', 'clrOz1', 'clrOz2', 'swrOz1', 'swrOz2', 'swrOz3', 'swrOz4']

        const name = e.target.name

        if (oners.includes(name)) {
            const value = parseFloat(e.target.value)
            form.setValue(name as any, Number(value.toFixed(2)))
        } else {
            const value = parseInt(e.target.value)
            form.setValue(name as any, Number(value))
        }
    }

    return (
        <>
            <FormBreadcrumbs currentPage={`Laminate - ${name}`} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 pb-4">
                    <FormHeader title={`Laminate - ${name}`} />

                    <Card>
                        <CardContent className="p-6 grid gap-4">
                            <div className="grid grid-cols-3 font-medium text-sm">
                                <span></span>
                                <span>With Linear</span>
                                <span>Without Linear</span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Axial Tensile Stress</span>
                                <FormField
                                    control={form.control}
                                    name="atsLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="atsLinear" autoFocus min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="atsNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="atsNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Axial Flexural Stress</span>
                                <FormField
                                    control={form.control}
                                    name="afsLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="afsLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="afsNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="afsNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Hoop Tensile Stress</span>
                                <FormField
                                    control={form.control}
                                    name="htsLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="htsLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="htsNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="htsNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Hoop Flexural Stress</span>
                                <FormField
                                    control={form.control}
                                    name="hfsLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="hfsLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="hfsNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="hfsNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Axial Tensile Modules</span>
                                <FormField
                                    control={form.control}
                                    name="atmLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="atmLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="atmNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="atmNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Axial Flexural Modules</span>
                                <FormField
                                    control={form.control}
                                    name="afmLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="afmLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="afmNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="afmNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Hoop Tensile Modules</span>
                                <FormField
                                    control={form.control}
                                    name="htmLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="htmLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="htmNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="htmNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Hoop Flexural Modules</span>
                                <FormField
                                    control={form.control}
                                    name="hfmLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="hfmLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="hfmNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="hfmNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Inplane Shear Stress</span>
                                <FormField
                                    control={form.control}
                                    name="issLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".0" id="issLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="issNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".0" id="issNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">psi</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Minimum Thickness</span>
                                <FormField
                                    control={form.control}
                                    name="mtLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="mtLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mtNonLinear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".01" id="mtNonLinear" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">in</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="text-sm font-medium">Layup Rate (struct. wall)</span>
                                <FormField
                                    control={form.control}
                                    name="layupRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <Input type="number" step=".01" id="layupRate" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">lb/hr</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 grid gap-4">
                            <div className="grid grid-cols-2 gap-14 font-medium text-sm">
                                <span>Corrosion Rinear Reinforcement</span>
                                <span>oz/ft^2</span>
                            </div>

                            <div className="grid grid-cols-2 gap-14">
                                <FormField
                                    control={form.control}
                                    name="clrName1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="emptyme" className="font-medium text-destructive">
                                                            REMOVE SELECTION
                                                        </SelectItem>
                                                        {glass?.map(glass => (
                                                            <SelectItem key={glass.id} value={glass.name}>
                                                                {glass.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="clrOz1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="clrOz1" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-14">
                                <FormField
                                    control={form.control}
                                    name="clrName2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="emptyme" className="font-medium text-destructive">
                                                            REMOVE SELECTION
                                                        </SelectItem>
                                                        {glass?.map(glass => (
                                                            <SelectItem key={glass.id} value={glass.name}>
                                                                {glass.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="clrOz2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="clrOz1" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 grid gap-4">
                            <div className="grid grid-cols-2 gap-14 font-medium text-sm">
                                <span>Structural Wall Reinforcement</span>
                                <span>oz/ft^2/in</span>
                            </div>

                            <div className="grid grid-cols-2 gap-14">
                                <FormField
                                    control={form.control}
                                    name="swrName1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="emptyme" className="font-medium text-destructive">
                                                            REMOVE SELECTION
                                                        </SelectItem>
                                                        {glass?.map(glass => (
                                                            <SelectItem key={glass.id} value={glass.name}>
                                                                {glass.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="swrOz1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="swrOz1" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-14">
                                <FormField
                                    control={form.control}
                                    name="swrName2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="emptyme" className="font-medium text-destructive">
                                                            REMOVE SELECTION
                                                        </SelectItem>
                                                        {glass?.map(glass => (
                                                            <SelectItem key={glass.id} value={glass.name}>
                                                                {glass.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="swrOz2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="swrOz2" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-14">
                                <FormField
                                    control={form.control}
                                    name="swrName3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="emptyme" className="font-medium text-destructive">
                                                            REMOVE SELECTION
                                                        </SelectItem>
                                                        {glass?.map(glass => (
                                                            <SelectItem key={glass.id} value={glass.name}>
                                                                {glass.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="swrOz3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="swrOz3" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-14">
                                <FormField
                                    control={form.control}
                                    name="swrName4"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="emptyme" className="font-medium text-destructive">
                                                            REMOVE SELECTION
                                                        </SelectItem>
                                                        {glass?.map(glass => (
                                                            <SelectItem key={glass.id} value={glass.name}>
                                                                {glass.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="swrOz4"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" step=".01" id="swrOz4" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
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

export default LaminateForm
