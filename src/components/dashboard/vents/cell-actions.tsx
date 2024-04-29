'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Vent } from '@/types/types'
import { Trash2 } from 'lucide-react'
import { deleteVent } from '@/database/vents'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { useVentsStore } from '@/zustand/vents-store'

const CellActions = ({ data }: { data: Vent }) => {
    const { setVents } = useVentsStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteVent(data.id)
            setDeleteModalOpen(false)
            setVents(response.data as Vent[])

            toast.success('Vent deleted!')
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
