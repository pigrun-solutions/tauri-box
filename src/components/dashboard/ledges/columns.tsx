'use client'
import CellActions from './cell-actions'
import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        width: 90,
        editable: false,
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'string',
        width: 180,
        editable: true,
    },
    {
        field: 'wtLbs',
        headerName: 'wt. lbs/ft. Circ.',
        type: 'number',
        width: 180,
        editable: true,
    },
    {
        field: 'layupRateLbs',
        headerName: 'Layup Rate lb/hr',
        type: 'number',
        width: 180,
        editable: true,
    },
    {
        field: 'actions',
        headerName: '',
        width: 150,
        editable: false,
        sortable: false,
        renderCell: params => {
            return <CellActions data={params.row} />
        },
    },
]
