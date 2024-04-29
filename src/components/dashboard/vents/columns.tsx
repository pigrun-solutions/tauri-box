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
    },
    {
        field: 'wtLbs',
        headerName: 'Wt. lbs.',
        type: 'number',
        width: 180,
        editable: true,
    },
    {
        field: 'labHours',
        headerName: 'Lab. hrs.',
        type: 'number',
        width: 180,
        editable: true,
    },
    {
        field: 'matCost',
        headerName: 'Mat. cost',
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
