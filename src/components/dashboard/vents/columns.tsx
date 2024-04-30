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
        field: 'diameterInch',
        headerName: 'Diameter in.',
        type: 'number',
        width: 180,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'wtLbs',
        headerName: 'Wt. lbs.',
        type: 'number',
        width: 180,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'labHours',
        headerName: 'Lab. hrs.',
        type: 'number',
        width: 180,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'matCost',
        headerName: 'Mat. cost',
        type: 'number',
        width: 180,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
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
