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
        field: 'name',
        headerName: 'Name',
        width: 180,
        editable: true,
    },
    {
        field: 'costKg',
        headerName: 'Cost $/Kg',
        type: 'number',
        width: 180,
        editable: true,
    },
    {
        field: 'costLbs',
        headerName: 'Cost $/Lbs',
        type: 'number',
        width: 180,
        editable: true,
    },
    {
        field: 'densityGmCc',
        headerName: 'Density gm/cm',
        type: 'number',
        width: 180,
        editable: true,
        valueSetter: (newValue, oldRow) => {
            const updatedValue = parseFloat(newValue)
            if (updatedValue < 1) return oldRow

            const updatedRow = { ...oldRow, densityGmCc: updatedValue }
            return updatedRow
        },
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
