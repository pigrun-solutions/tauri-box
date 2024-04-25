import { Lock } from 'lucide-react'
import LoginForm from '@/components/auth/login-form'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: async ({ context }) => {
        const { isLogged } = context.authentication
        if (isLogged()) throw redirect({ to: '/dashboard' })
    },
    component: () => <SignIn />,
})

const SignIn = () => {
    return (
        <>
            <main className="grid h-screen place-items-center px-4">
                <div className="flex h-screen items-center justify-center">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex flex-col text-center">
                            <div className="mb-2 flex items-center justify-center">
                                <div className="rounded-full bg-blue-100 p-5">
                                    <Lock size={32} className="text-primary" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Welcome Back</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Enter your password to log in to your account.</p>
                        </div>

                        <LoginForm />
                    </div>
                </div>
            </main>
        </>
    )
}
