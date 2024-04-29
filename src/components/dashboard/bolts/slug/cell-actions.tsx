import { toast } from 'sonner'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { BoltVariants } from '@/types/types'
import { Button } from '@/components/ui/button'
import { deleteBoltVariant } from '@/database/bolts'
import AlertModal from '@/components/ui/alert-modal'
import { useBoltVariantsStore } from '@/zustand/bolts-store'

const CellActions = ({ data }: { data: BoltVariants }) => {
    const { setBoltVariants } = useBoltVariantsStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteBoltVariant(data.id)
            setDeleteModalOpen(false)
            setBoltVariants(response.data as BoltVariants[])

            toast.success('Bolt Variant deleted!')
        } catch (error: any) {
            toast.error(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={onDelete} loading={loading} />

            <div className="flex gap-2 items-center justify-end h-full">
                <Button variant="ghost" size="icon" className="size-5" asChild>
                    <Trash2 className="text-destructive cursor-pointer size-5" onClick={() => setDeleteModalOpen(true)} />
                </Button>
            </div>
        </>
    )
}

export default CellActions
