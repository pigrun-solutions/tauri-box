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
        field: 'sizeInch',
        headerName: 'Size. in.',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'cost',
        headerName: 'Cost $',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'nozWtLbs',
        headerName: 'Noz. Wt. lb.',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'weldWtLbs',
        headerName: 'Weld. Wt. lb.',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'labHours',
        headerName: 'Lab. hrs.',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'diameter',
        headerName: 'diam.',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(3)
            return roundedValue
        },
    },
    {
        field: 'boltsNum',
        headerName: 'Bolts num.',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'length',
        headerName: 'length',
        type: 'number',
        width: 120,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(3)
            return roundedValue
        },
    },
    {
        field: 'actions',
        headerName: '',
        width: 120,
        editable: false,
        sortable: false,
        renderCell: params => {
            return <CellActions data={params.row} />
        },
    },
]
