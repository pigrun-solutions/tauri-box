import { create } from 'zustand'

type SocketStore = {
    status: boolean
    setStatus: (status: boolean) => void
}

export const useSocketStore = create<SocketStore>(set => ({
    status: false,
    setStatus: status => set({ status }),
}))
