import { useSocketStore } from '@/zustand/socket-store'

const ConnectedStatus = () => {
    const { status } = useSocketStore()
    return (
        <div className="absolute z-10 top-0 w-full flex items-center justify-center">
            {status ? (
                <div className="bg-green-800 text-white px-3 py-1 rounded-b-md text-sm font-semibold select-none">Connected</div>
            ) : (
                <div className="bg-red-800 text-white px-3 py-1 rounded-b-md text-sm font-semibold select-none">Disconnected</div>
            )}
        </div>
    )
}

export default ConnectedStatus
