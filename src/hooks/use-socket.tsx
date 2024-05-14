import { toast } from 'sonner'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { Settings } from '@/types/types'
import { getSettings } from '@/database/settings'
import { useSocketStore } from '@/zustand/socket-store'
import { useSettingsStore } from '@/zustand/settings-store'

const useSocket = () => {
    const { settings } = useSettingsStore()
    const { socket, setSocket, setStatus } = useSocketStore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const settingData = (await getSettings()).data as Settings[]
                const settings = settingData[0]

                if (!socket) {
                    const newSocket = await io(`http://${settings.ip}:${settings.port}`)
                    newSocket.on('connect', () => {
                        console.log('Connected!')
                        setSocket(newSocket)
                        setStatus(true)
                        toast.success('Socket connected!')
                    })
                }
            } catch (error) {
                console.error('Error fetching settings:', error)
            }
        }

        fetchData()
    }, [socket, settings])

    return null
}

export default useSocket
