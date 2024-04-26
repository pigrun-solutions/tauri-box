'use client'
import { Glass } from '@/types/types'
import CellActions from './cell-actions'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Glass>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
    },
    {
        accessorKey: 'name',
        header: () => <span>Name</span>,
        cell: ({ row }) => <Link to={`/dashboard/glasses/${row.original.id}`}>{row.original.name}</Link>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellActions data={row.original} />,
    },
]
