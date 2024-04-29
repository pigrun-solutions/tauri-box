import { toast } from 'sonner'
import { useState } from 'react'
import { Bolt } from '@/types/types'
import { Edit3, Trash2 } from 'lucide-react'
import { deleteBolt } from '@/database/bolts'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import AlertModal from '@/components/ui/alert-modal'
import { useBoltsStore } from '@/zustand/bolts-store'

const CellActions = ({ data }: { data: Bolt }) => {
    const navigate = useNavigate()
    const { setBolts } = useBoltsStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            console.log('data', data)

            const response = await deleteBolt(data.id)
            setDeleteModalOpen(false)
            setBolts(response.data as Bolt[])

            toast.success('Bolt deleted!')
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
                    <Edit3 className="text-primary cursor-pointer size-5" onClick={() => navigate({ to: `/dashboard/bolts/${data.id}` })} />
                </Button>

                <Button variant="ghost" size="icon" className="size-5" asChild>
                    <Trash2 className="text-destructive cursor-pointer size-5" onClick={() => setDeleteModalOpen(true)} />
                </Button>
            </div>
        </>
    )
}

export default CellActions
