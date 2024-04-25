'use client'
import CellActions from './cell-actions'
import { Customer } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
    },
    {
        accessorKey: 'name',
        header: () => <span>Name</span>,
        cell: ({ row }) => <Link to={`/dashboard/additives/${row.original.id}`}>{row.original.name}</Link>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellActions data={row.original} />,
    },
]
