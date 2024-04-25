import Modal from './modal'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface AlertModalProps {
    title?: string
    description?: string
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
    destructive?: boolean
}

const AlertModal: React.FC<AlertModalProps> = ({ title = 'Are you sure?', description = 'This action cannot be reverted.', isOpen, onClose, onConfirm, loading, destructive = true }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
            <div className="flex  w-full items-center justify-center space-x-4 pt-4 md:justify-end md:space-x-2">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant={destructive ? 'destructive' : 'default'} onClick={onConfirm}>
                    <Loader className={cn('mr-2 hidden h-4 w-4 animate-spin', loading && 'block')} />
                    Continue
                </Button>
            </div>
        </Modal>
    )
}

export default AlertModal
