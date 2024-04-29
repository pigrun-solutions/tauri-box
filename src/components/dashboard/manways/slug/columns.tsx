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
    },
    {
        field: 'cost',
        headerName: 'Cost $',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'nozWtLbs',
        headerName: 'Noz. Wt. lb.',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'weldWtLbs',
        headerName: 'Weld. Wt. lb.',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'labHours',
        headerName: 'Lab. hrs.',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'diameter',
        headerName: 'diam.',
        type: 'number',
        width: 120,
        editable: true,
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
