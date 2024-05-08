import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { order7Schema } from '@/lib/schemas/orderSchemas'
import FormHeaderSteps from '@/components/ui/form-header-steps'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useStepSevenStore, useStepTwoStore } from '@/zustand/horizontal-orders-store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const DisabledField = ({ label, value, symbol }: { label: string; value: number; symbol?: string }) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label className="w-full capitalize whitespace-nowrap">{label}</Label>
            <Input type="number" id="markup" className="w-full h-8" defaultValue={value} disabled />
            {symbol && <span className="font-semibold text-sm">{symbol}</span>}
        </div>
    )
}

const StepSevenForm = () => {
    const navigate = useNavigate()

    const { stepTwo } = useStepTwoStore()
    const { stepSeven, setStepSeven } = useStepSevenStore()

    const form = useForm<z.infer<typeof order7Schema>>({
        resolver: zodResolver(order7Schema),
        defaultValues: { thickness: stepSeven.thickness || 1.15, distFromHead: stepSeven.distFromHead || 0, saddleArc: stepSeven.saddleArc || 0 },
    })
    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const zero = ['distFromHead', 'saddleArc']

        const name = e.target.name
        const value = !e.target.value ? 0 : parseFloat(e.target.value)
        if (isNaN(value)) return

        if (zero.includes(name)) form.setValue(name as any, Number(value.toFixed(0)))
        else form.setValue(name as any, Number(value.toFixed(2)))
    }

    const onSubmit = async (values: z.infer<typeof order7Schema>) => {
        setStepSeven(values)
        navigate({ to: '/dashboard/horizontal/1' })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormHeaderSteps title="Horizontal Tank Design" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shell Wall</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 grid gap-3">
                                    <DisabledField label="Internal diameter" value={stepTwo.shellInternalDiam || 0} symbol="in" />
                                    <DisabledField label="Length" value={stepTwo.shellLength || 0} symbol="in" />

                                    <FormField
                                        control={form.control}
                                        name="thickness"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <FormLabel htmlFor="thickness" className="w-32 capitalize">
                                                            Thickness
                                                        </FormLabel>
                                                        <Input type="number" id="thickness" min={1.15} autoFocus className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">in</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <DisabledField label="Weight" value={0} symbol="lb" />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Heads -{' '}
                                        <span className="text-primary cursor-pointer" onClick={() => navigate({ to: '/dashboard/horizontal/2' })}>
                                            {stepTwo.headType || 'Not picked'}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 grid gap-3">
                                    <DisabledField label="Thickness" value={0} symbol="in" />
                                    <DisabledField label="Weight" value={0} symbol="lb" />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Saddles</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="distFromHead"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <FormLabel htmlFor="distFromHead" className="w-32 capitalize">
                                                            Dist from head
                                                        </FormLabel>
                                                        <Input type="number" id="distFromHead" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">in</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="saddleArc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <FormLabel htmlFor="saddleArc" className="w-32 capitalize">
                                                            Saddle Arc
                                                        </FormLabel>
                                                        <Input type="number" id="saddleArc" min={0} className="w-full h-8" {...field} onChange={onChangeNumber} />
                                                        <span className="font-semibold text-sm">in</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <DisabledField label="Spacing" value={0} symbol="in" />
                                    <DisabledField label="Width" value={stepTwo.saddleWidth || 0} symbol="in" />
                                    <DisabledField label="Vertical load" value={0} symbol="lb" />
                                    <DisabledField label="Lateral load" value={0} symbol="lb" />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Flange</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 grid gap-3"></CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default StepSevenForm
