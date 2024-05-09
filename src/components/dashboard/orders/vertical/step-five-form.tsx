import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { order5Schema } from '@/lib/schemas/orderSchemas'
// import { useAdditivesStore } from '@/zustand/additives-store'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { useVerticalStepFiveStore } from '@/zustand/vertical-orders-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const StepFiveForm = () => {
    const navigate = useNavigate()
    // const { additives } = useAdditivesStore()

    const { stepFive, setStepFive } = useVerticalStepFiveStore()

    const form = useForm<z.infer<typeof order5Schema>>({
        resolver: zodResolver(order5Schema),
        defaultValues: {
            liftLugs: stepFive.liftLugs || 0,
            markup: stepFive.markup || 0,
            design: stepFive.design || 0,
            postcure: stepFive.postcure || 0,
            // additives?: string
            nameplate: stepFive.nameplate || 0,
            ladderClips: stepFive.ladderClips || 0,
            ventDiameter: stepFive.ventDiameter || 0,

            hydro: stepFive.hydro || 0,
            ae: stepFive.ae || 0,
            vacuum: stepFive.vacuum || 0,
            cutouts: stepFive.cutouts || 0,

            freight: stepFive.freight || 0,
            handling: stepFive.handling || 0,
            cradles: stepFive.cradles || 0,
            escort: stepFive.escort || 0,

            new: stepFive.new || false,
            tankNum: stepFive.tankNum || 0,
            head: stepFive.head || 0,
            shell: stepFive.shell || 0,
            other: stepFive.other || 0,
        },
    })

    const onSubmit = async (values: z.infer<typeof order5Schema>) => {
        setStepFive(values)
        navigate({ to: '/dashboard/vertical/6' })
    }

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const zero = ['liftLugs', 'markup', 'ventDiameter', 'ladderClips', 'freight']
        const oners = ['tankNum']

        const value = !e.target.value ? 0 : parseFloat(e.target.value)
        if (isNaN(value)) return
        const name = e.target.name

        if (zero.includes(name)) form.setValue(name as any, Number(value.toFixed(0)))
        else if (oners.includes(name)) form.setValue(name as any, Number(value.toFixed(1)))
        else form.setValue(name as any, Number(value.toFixed(2)))
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Additional Cost Items" />

                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="liftLugs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="liftLugs" className="w-32 capitalize">
                                                    liftLugs
                                                </FormLabel>
                                                <Input type="number" id="liftLugs" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">No.</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="markup"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="markup" className="w-32 capitalize">
                                                    markup
                                                </FormLabel>
                                                <Input type="number" id="markup" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">%</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="design"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="design" className="w-32 capitalize">
                                                    design
                                                </FormLabel>
                                                <Input type="number" id="design" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postcure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="postcure" className="w-32 capitalize">
                                                    postcure
                                                </FormLabel>
                                                <Input type="number" id="postcure" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
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
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="nameplate" className="w-32 capitalize">
                                                    nameplate
                                                </FormLabel>
                                                <Input type="number" id="nameplate" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ladderClips"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="ladderClips" className="w-32 capitalize">
                                                    ladder Clips
                                                </FormLabel>
                                                <Input type="number" id="ladderClips" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">No.</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ventDiameter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="ventDiameter" className="w-32 capitalize">
                                                    Vent Diam.
                                                </FormLabel>
                                                <Input type="number" id="nameventDiameterplate" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">inch</span>
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
                            <CardTitle>Additives</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3"></CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Testing</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="hydro"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="hydro" className="w-32 capitalize">
                                                    Hydro
                                                </FormLabel>
                                                <Input type="number" id="hydro" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ae"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="ae" className="w-32 capitalize">
                                                    AE
                                                </FormLabel>
                                                <Input type="number" id="ae" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vacuum"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="vacuum" className="w-32 capitalize">
                                                    Vacuum
                                                </FormLabel>
                                                <Input type="number" id="vacuum" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cutouts"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="cutouts" className="w-32 capitalize">
                                                    Cutouts
                                                </FormLabel>
                                                <Input type="number" id="cutouts" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
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
                            <CardTitle>Shipping</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="freight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="freight" className="w-32 capitalize">
                                                    freight
                                                </FormLabel>
                                                <Input type="number" id="freight" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="handling"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="handling" className="w-32 capitalize">
                                                    handling
                                                </FormLabel>
                                                <Input type="number" id="handling" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cradles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="cradles" className="w-32 capitalize">
                                                    cradles
                                                </FormLabel>
                                                <Input type="number" id="cradles" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="escort"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <FormLabel htmlFor="escort" className="w-32 capitalize">
                                                    escort
                                                </FormLabel>
                                                <Input type="number" id="escort" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                <span className="font-semibold text-sm">$</span>
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
                            <CardTitle>Pattern</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <FormField
                                control={form.control}
                                name="new"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>New Pattern?</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="tankNum"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <FormLabel htmlFor="tankNum" className="w-32 capitalize">
                                                        No. Tanks
                                                    </FormLabel>
                                                    <Input type="number" id="tankNum" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="head"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <FormLabel htmlFor="head" className="w-32 capitalize">
                                                        head
                                                    </FormLabel>
                                                    <Input type="number" id="head" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">$</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="shell"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <FormLabel htmlFor="shell" className="w-32 capitalize">
                                                        shell
                                                    </FormLabel>
                                                    <Input type="number" id="shell" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">$</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="other"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <FormLabel htmlFor="other" className="w-32 capitalize">
                                                        other
                                                    </FormLabel>
                                                    <Input type="number" id="other" min={0} className="w-52 h-8" {...field} onChange={onChangeNumber} />
                                                    <span className="font-semibold text-sm">$</span>
                                                </div>
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

export default StepFiveForm
