import { toast } from 'sonner'
import { useState } from 'react'
import { Laminate } from '@/types/types'
import { Edit3, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import AlertModal from '@/components/ui/alert-modal'
import { deleteLaminate } from '@/database/laminates'
import { useLaminateStore } from '@/zustand/laminate-store'

const CellActions = ({ data }: { data: Laminate }) => {
    const navigate = useNavigate()
    const { setLaminates } = useLaminateStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteLaminate(data.id)
            setDeleteModalOpen(false)
            setLaminates(response.data as Laminate[])

            toast.success('Laminate deleted!')
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
                <Button variant="ghost" size="icon" className="size-5" disabled={true} asChild>
                    <Edit3 className="text-primary cursor-pointer size-5" onClick={() => navigate({ to: `/dashboard/laminates/${data.id}` })} />
                </Button>

                <Button variant="ghost" size="icon" className="size-5" asChild>
                    <Trash2 className="text-destructive cursor-pointer size-5" onClick={() => setDeleteModalOpen(true)} />
                </Button>
            </div>
        </>
    )
}

export default CellActions
