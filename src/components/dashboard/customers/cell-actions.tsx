import { toast } from 'sonner'
import { useState } from 'react'
import { Edit3, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/ui/alert-modal'
import { Customer } from '@/types/types'
import { useCustomersStore } from '@/zustand/customers-store'
import { deleteCustomer } from '@/database/customers'
import { useNavigate } from '@tanstack/react-router'

const CellActions = ({ data }: { data: Customer }) => {
    const navigate = useNavigate()
    const { setCustomers } = useCustomersStore()
    const [loading, setLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            const response = await deleteCustomer(data.id)
            setDeleteModalOpen(false)
            setCustomers(response.data as Customer[])

            toast.success('Customer deleted!')
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
                    <Edit3 className="text-primary cursor-pointer size-5" onClick={() => navigate({ to: `/dashboard/customers/${data.id}` })} />
                </Button>

                <Button variant="ghost" size="icon" className="size-5" asChild>
                    <Trash2 className="text-destructive cursor-pointer size-5" onClick={() => setDeleteModalOpen(true)} />
                </Button>
            </div>
        </>
    )
}

export default CellActions
