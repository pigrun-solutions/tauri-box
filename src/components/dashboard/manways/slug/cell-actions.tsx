import { toast } from 'sonner'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ManwayVariants } from '@/types/types'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { deleteManwayVariant } from '@/database/manways'
import { useManwayVariantsStore } from '@/zustand/manways-store'

const CellActions = ({ data }: { data: ManwayVariants }) => {
    const { setManwayVariants } = useManwayVariantsStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteManwayVariant(data.id)
            setDeleteModalOpen(false)
            setManwayVariants(response.data as ManwayVariants[])

            toast.success('Manway Variant deleted!')
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
