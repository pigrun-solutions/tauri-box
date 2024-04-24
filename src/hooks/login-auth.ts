'use client'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

const LoginAuth = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn')
            if (isLoggedIn) navigate({ to: '/dashboard' })
        }
    }, [])

    return null
}

export default LoginAuth
