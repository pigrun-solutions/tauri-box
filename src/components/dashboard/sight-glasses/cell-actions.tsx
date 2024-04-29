'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Edit3, Trash2 } from 'lucide-react'
import { SightGlasses } from '@/types/types'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import AlertModal from '@/components/ui/alert-modal'
import { deleteSightGlass } from '@/database/sightglasses'
import { useSightGlassesStore } from '@/zustand/sightglasses-store'

const CellActions = ({ data }: { data: SightGlasses }) => {
    const navigate = useNavigate()
    const { setSightGlasses } = useSightGlassesStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteSightGlass(data.id)
            setDeleteModalOpen(false)
            setSightGlasses(response.data as SightGlasses[])

            toast.success('Sight Glass deleted!')
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
                    <Edit3 className="text-primary cursor-pointer size-5" onClick={() => navigate({ to: `/dashboard/sightglasses/${data.id}` })} />
                </Button>

                <Button variant="ghost" size="icon" className="size-5" asChild>
                    <Trash2 className="text-destructive cursor-pointer size-5" onClick={() => setDeleteModalOpen(true)} />
                </Button>
            </div>
        </>
    )
}

export default CellActions
