import { create } from 'zustand'

type SocketStore = {
    socket: any | null
    status: boolean
    setStatus: (status: boolean) => void
    setSocket: (socket: any | null) => void

    reset: () => void
}

export const useSocketStore = create<SocketStore>(set => ({
    socket: null,
    status: false,
    setStatus: status => set({ status }),
    setSocket: socket => set({ socket }),

    reset: () => set({ socket: null, status: false }),
}))
