import { z } from 'zod'
import { toast } from 'sonner'
import { Other } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { createEditOther } from '@/database/other'
import otherSchema from '@/lib/schemas/otherSchema'
import FormHeader from '@/components/ui/form-header'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const OtherForm = ({ initialData }: { initialData: Other }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof otherSchema>>({
        resolver: zodResolver(otherSchema),
        defaultValues: {
            labourRate: initialData.labourRate || undefined,
            wastage: initialData.wastage || undefined,
            nameplate: initialData.nameplate || undefined,
            pattern: initialData.pattern || undefined,
            usage: initialData.usage || undefined,

            ladderClipsCost: initialData.ladderClipsCost || undefined,
            ladderClipsLbs: initialData.ladderClipsLbs || undefined,
            ladderClipsHrs: initialData.ladderClipsHrs || undefined,

            manwayHingesCost: initialData.manwayHingesCost || undefined,
            manwayHingesLbs: initialData.manwayHingesLbs || undefined,
            manwayHingesHrs: initialData.manwayHingesHrs || undefined,

            manwayDavitsCost: initialData.manwayDavitsCost || undefined,
            manwayDavitsLbs: initialData.manwayDavitsLbs || undefined,
            manwayDavitsHrs: initialData.manwayDavitsHrs || undefined,

            layupRateSqFt: initialData.layupRateSqFt || undefined,

            balsaThickness1: initialData.balsaThickness1 || undefined,
            balsaThickness2: initialData.balsaThickness2 || undefined,
            balsaThickness3: initialData.balsaThickness3 || undefined,
            balsaThickness4: initialData.balsaThickness4 || undefined,
            balsaThickness5: initialData.balsaThickness5 || undefined,

            balsaCost1: initialData.balsaCost1 || undefined,
            balsaCost2: initialData.balsaCost2 || undefined,
            balsaCost3: initialData.balsaCost3 || undefined,
            balsaCost4: initialData.balsaCost4 || undefined,
            balsaCost5: initialData.balsaCost5 || undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof otherSchema>) => {
        try {
            setLoading(true)

            if (initialData) await createEditOther({ ...values, id: initialData.id })
            else await createEditOther(values)

            navigate({ to: '/dashboard/other' })
            toast.success('Other saved successfully')
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        form.reset({
            labourRate: initialData.labourRate || undefined,
            wastage: initialData.wastage || undefined,
            nameplate: initialData.nameplate || undefined,
            pattern: initialData.pattern || undefined,
            usage: initialData.usage || undefined,

            ladderClipsCost: initialData.ladderClipsCost || undefined,
            ladderClipsLbs: initialData.ladderClipsLbs || undefined,
            ladderClipsHrs: initialData.ladderClipsHrs || undefined,

            manwayHingesCost: initialData.manwayHingesCost || undefined,
            manwayHingesLbs: initialData.manwayHingesLbs || undefined,
            manwayHingesHrs: initialData.manwayHingesHrs || undefined,

            manwayDavitsCost: initialData.manwayDavitsCost || undefined,
            manwayDavitsLbs: initialData.manwayDavitsLbs || undefined,
            manwayDavitsHrs: initialData.manwayDavitsHrs || undefined,

            layupRateSqFt: initialData.layupRateSqFt || undefined,

            balsaThickness1: initialData.balsaThickness1 || undefined,
            balsaThickness2: initialData.balsaThickness2 || undefined,
            balsaThickness3: initialData.balsaThickness3 || undefined,
            balsaThickness4: initialData.balsaThickness4 || undefined,
            balsaThickness5: initialData.balsaThickness5 || undefined,

            balsaCost1: initialData.balsaCost1 || undefined,
            balsaCost2: initialData.balsaCost2 || undefined,
            balsaCost3: initialData.balsaCost3 || undefined,
            balsaCost4: initialData.balsaCost4 || undefined,
            balsaCost5: initialData.balsaCost5 || undefined,
        })
    }, [initialData])

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const oners = ['wastage', 'usage', 'ladderClipsLbs', 'ladderClipsHrs', 'manwayHingesLbs', 'manwayHingesHrs', 'manwayDavitsLbs', 'manwayDavitsHrs', 'layupRateSqFt']

        const value = parseFloat(e.target.value)
        const name = e.target.name

        if (oners.includes(name)) form.setValue(name as any, Number(value.toFixed(1)))
        else form.setValue(name as any, Number(value.toFixed(2)))
    }

    return (
        <>
            <FormBreadcrumbs currentPage="Other" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-4">
                    <FormHeader title="Other Cost Item" />

                    <Card>
                        <CardContent className="p-6">
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="labourRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <FormLabel htmlFor="labourRate" className="w-32 whitespace-nowrap">
                                                        Labour Rate
                                                    </FormLabel>
                                                    <Input type="number" step=".01" id="labourRate" min={0} autoFocus className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">$/hr</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="wastage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <FormLabel htmlFor="wastage" className="w-32 whitespace-nowrap">
                                                        Wastage
                                                    </FormLabel>
                                                    <Input type="number" id="wastage" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">%</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nameplate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <FormLabel htmlFor="nameplate" className="w-32 whitespace-nowrap">
                                                        Nameplate
                                                    </FormLabel>
                                                    <Input type="number" id="nameplate" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">$</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pattern"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <FormLabel htmlFor="pattern" className="w-32 whitespace-nowrap">
                                                        Pattern
                                                    </FormLabel>
                                                    <Input type="number" id="pattern" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">$/sq.ft.</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="usage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <FormLabel htmlFor="usage" className="w-32 whitespace-nowrap">
                                                        Usage
                                                    </FormLabel>
                                                    <Input type="number" id="usage" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">%</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="ladderClipsCost"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="ladderClipsCost" className="w-32 whitespace-nowrap">
                                                            Ladder Clip
                                                        </FormLabel>
                                                        <Input type="number" id="ladderClipsCost" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">$</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ladderClipsLbs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <Input type="number" id="ladderClipsLbs" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">lb.</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ladderClipsHrs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <Input type="number" id="ladderClipsHrs" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">hrs .</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="manwayHingesCost"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="manwayHingesCost" className="w-32 whitespace-nowrap">
                                                            Manway Hinges
                                                        </FormLabel>
                                                        <Input type="number" id="manwayHingesCost" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">$</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="manwayHingesLbs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <Input type="number" id="manwayHingesLbs" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">lb.</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="manwayHingesHrs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <Input type="number" id="manwayHingesHrs" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">hrs .</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="manwayDavitsCost"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="manwayDavitsCost" className="w-32 whitespace-nowrap">
                                                            Manway Davits
                                                        </FormLabel>
                                                        <Input type="number" id="manwayHingesCost" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">$</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="manwayDavitsLbs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <Input type="number" id="manwayDavitsLbs" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">lb.</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="manwayDavitsHrs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <Input type="number" id="manwayDavitsHrs" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">hrs .</span>
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
                            <CardTitle>Balsa Core</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="layupRateSqFt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <FormLabel htmlFor="layupRateSqFt" className="w-32 whitespace-nowrap">
                                                        Layup Rate
                                                    </FormLabel>
                                                    <Input type="number" id="layupRateSqFt" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">sq ft/hr</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center gap-9">
                                    <div className="space-y-2">
                                        <h4 className="text-center font-medium text-sm">Thickness in.</h4>
                                        <FormField
                                            control={form.control}
                                            name="balsaThickness1"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaThickness1" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaThickness2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaThickness2" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaThickness3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaThickness3" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaThickness4"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaThickness4" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaThickness5"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaThickness5" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-center font-medium text-sm">Cost $/sq ft.</h4>
                                        <FormField
                                            control={form.control}
                                            name="balsaCost1"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaCost1" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaCost2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaCost2" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaCost3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaCost3" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaCost4"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaCost4" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="balsaCost5"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" id="balsaCost5" step=".01" min={0} className="w-52 h-8" disabled={loading} {...field} onChange={onChangeNumber} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default OtherForm
