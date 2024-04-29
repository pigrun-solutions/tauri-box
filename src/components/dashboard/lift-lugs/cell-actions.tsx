'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { LiftLug } from '@/types/types'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteLiftLug } from '@/database/liftlugs'
import AlertModal from '@/components/ui/alert-modal'
import { useLiftLugsStore } from '@/zustand/liftlugs-store'

const CellActions = ({ data }: { data: LiftLug }) => {
    const { setLiftLugs } = useLiftLugsStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteLiftLug(data.id)
            setDeleteModalOpen(false)
            setLiftLugs(response.data as LiftLug[])

            toast.success('Lift Lug deleted!')
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
