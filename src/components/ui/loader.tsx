import { Loader2 } from 'lucide-react'

const Loader = () => {
    return (
        <div className="h-screen w-full grid place-items-center">
            <Loader2 className="size-20 text-primary animate-spin" />
        </div>
    )
}

export default Loader
