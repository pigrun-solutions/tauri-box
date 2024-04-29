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
        field: 'variantId',
        headerName: 'ID',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'od',
        headerName: 'OD',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'bc',
        headerName: 'BC',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'boltsNum',
        headerName: 'Bolts',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'diameter',
        headerName: 'Diam',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'flgT',
        headerName: 'Flg. t',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'cost',
        headerName: 'Cost $',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'blindCost',
        headerName: 'Blind $',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'nozWtLbs',
        headerName: 'Noz. Wt. lbs.',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'welWtLbs',
        headerName: 'Weld. Wt. lbs.',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'labHours',
        headerName: 'Lab hrs.',
        type: 'number',
        width: 95,
        editable: true,
    },
    {
        field: 'actions',
        headerName: '',
        width: 95,
        editable: false,
        sortable: false,
        renderCell: params => {
            return <CellActions data={params.row} />
        },
    },
]
