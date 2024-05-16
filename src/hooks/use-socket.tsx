import { useEffect } from 'react'
import { Settings } from '@/types/types'
import { getSettings } from '@/database/settings'
import { useSocketStore } from '@/zustand/socket-store'
import { useSettingsStore } from '@/zustand/settings-store'

const useSocket = (): WebSocket | null => {
    const { settings } = useSettingsStore()
    const { socket, setSocket, setStatus } = useSocketStore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const settingData = (await getSettings()).data as Settings[]
                const settings: Settings = settingData[0]

                const ws = new WebSocket(`ws://${settings.ip}:${settings.port}`)

                ws.onopen = () => {
                    console.log('Connected to Packet Sender.')
                    setStatus(true)
                }

                ws.onmessage = event => console.log('Received message from Packet Sender:', event.data)
                ws.onerror = error => {
                    console.error('WebSocket encountered an error:', error)
                }

                ws.onclose = () => {
                    console.log('Disconnected from Packet Sender.')
                    setStatus(false)
                }

                setSocket(ws)
            } catch (error) {
                console.error('Error fetching settings:', error)
            }
        }

        fetchData()

        return () => {
            if (socket) socket.close()
        }
    }, [settings])

    return null
}

export default useSocket
