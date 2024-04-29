import { toast } from 'sonner'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Resin } from '@/types/types'
import { deleteResin } from '@/database/resin'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { useResinStore } from '@/zustand/resin-store'

const CellActions = ({ data }: { data: Resin }) => {
    const { setResin } = useResinStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteResin(data.id)
            setDeleteModalOpen(false)
            setResin(response.data as Resin[])

            toast.success('Resin deleted!')
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
