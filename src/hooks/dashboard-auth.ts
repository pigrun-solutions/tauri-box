'use client'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

const DashboardAuth = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn')
            if (!isLoggedIn) navigate({ to: '/' })
        }
    }, [])

    return null
}

export default DashboardAuth
