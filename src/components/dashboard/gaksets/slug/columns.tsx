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
        headerName: 'Diam. in.',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'cost',
        headerName: 'Cost $',
        type: 'number',
        width: 150,
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
