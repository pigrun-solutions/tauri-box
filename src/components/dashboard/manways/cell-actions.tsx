import { toast } from 'sonner'
import { useState } from 'react'
import { Manway } from '@/types/types'
import { Edit3, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteManway } from '@/database/manways'
import { useNavigate } from '@tanstack/react-router'
import AlertModal from '@/components/ui/alert-modal'
import { useManwayStore } from '@/zustand/manways-store'

const CellActions = ({ data }: { data: Manway }) => {
    const navigate = useNavigate()
    const { setManways } = useManwayStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteManway(data.id)
            setDeleteModalOpen(false)
            setManways(response.data as Manway[])

            toast.success('Manway deleted!')
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
                    <Edit3 className="text-primary cursor-pointer size-5" onClick={() => navigate({ to: `/dashboard/manways/${data.id}` })} />
                </Button>

                <Button variant="ghost" size="icon" className="size-5" asChild>
                    <Trash2 className="text-destructive cursor-pointer size-5" onClick={() => setDeleteModalOpen(true)} />
                </Button>
            </div>
        </>
    )
}

export default CellActions
