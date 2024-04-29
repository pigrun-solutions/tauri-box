import { toast } from 'sonner'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Additive } from '@/types/types'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { deleteAdditive } from '@/database/additives'
import { useAdditivesStore } from '@/zustand/additives-store'

const CellActions = ({ data }: { data: Additive }) => {
    const { setAdditives } = useAdditivesStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteAdditive(data.id)
            setDeleteModalOpen(false)
            setAdditives(response.data as Additive[])

            toast.success('Additive deleted!')
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
