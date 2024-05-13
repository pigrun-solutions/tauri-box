import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }: ModalProps) => {
    const onChange = (open: boolean) => {
        if (!open) onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className="pb-2">
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
