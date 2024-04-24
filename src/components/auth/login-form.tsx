'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import loginSchema from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const LoginForm = () => {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { password: '' } })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        if (values.password === '1234tml') {
            sessionStorage.setItem('isLoggedIn', 'true')
            navigate({ to: '/dashboard' })
        } else form.setError('password', { type: 'manual', message: 'Incorrect password' })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm
