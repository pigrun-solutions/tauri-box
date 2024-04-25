'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Additive } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { deleteAdditive } from '@/database/additives'
import { useAdditivesStore } from '@/zustand/additives-store'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

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

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link to={`/dashboard/additives/${data.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteModalOpen(true)} className="text-destructive hover:!text-destructive">
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellActions
