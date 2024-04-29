import { toast } from 'sonner'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NozzleVariants } from '@/types/types'
import AlertModal from '@/components/ui/alert-modal'
import { deleteNozzleVariant } from '@/database/nozzles'
import { useNozzleVariantsStore } from '@/zustand/nozzles-store'

const CellActions = ({ data }: { data: NozzleVariants }) => {
    const { setNozzleVariants } = useNozzleVariantsStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteNozzleVariant(data.id)
            setDeleteModalOpen(false)
            setNozzleVariants(response.data as NozzleVariants[])

            toast.success('Nozzle Variant deleted!')
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
