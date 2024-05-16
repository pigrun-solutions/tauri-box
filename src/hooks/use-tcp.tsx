import { useEffect } from 'react'
import socketIO from 'socket.io-client'
import { useSocketStore } from '@/zustand/socket-store'

const useTcp = () => {
    const { socket: ws, setSocket } = useSocketStore()

    useEffect(() => {
        if (!ws) {
            const socket = socketIO('http://localhost:8284')
            setSocket(socket)

            socket.on('connect', () => {
                console.log('Connected to server')
            })

            return () => {
                socket.close()
            }
        }
    }, [setSocket])
}

export default useTcp
