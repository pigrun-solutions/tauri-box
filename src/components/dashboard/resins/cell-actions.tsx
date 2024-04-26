'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Resin } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { MoreHorizontal } from 'lucide-react'
import { deleteResin } from '@/database/resin'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { useResinStore } from '@/zustand/resin-store'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const CellActions = ({ data }: { data: Resin }) => {
    const { setResin } = useResinStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteResin(data.id)
            setDeleteModalOpen(false)
            setResin(response.data as Resin[])

            toast.success('Resin deleted!')
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
                        <Link to={`/dashboard/resins/${data.id}`}>Edit</Link>
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
