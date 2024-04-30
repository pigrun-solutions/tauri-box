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
        width: 85,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'od',
        headerName: 'OD',
        type: 'number',
        width: 85,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'bc',
        headerName: 'BC',
        type: 'number',
        width: 85,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
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
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(3)
            return roundedValue
        },
    },
    {
        field: 'flgT',
        headerName: 'Flg. t',
        type: 'number',
        width: 95,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(3)
            return roundedValue
        },
    },
    {
        field: 'cost',
        headerName: 'Cost $',
        type: 'number',
        width: 95,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'blindCost',
        headerName: 'Blind $',
        type: 'number',
        width: 95,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'nozWtLbs',
        headerName: 'Noz. Wt. lbs.',
        type: 'number',
        width: 110,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'welWtLbs',
        headerName: 'Weld. Wt. lbs.',
        type: 'number',
        width: 110,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
    },
    {
        field: 'labHours',
        headerName: 'Lab hrs.',
        type: 'number',
        width: 95,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(1)
            return roundedValue
        },
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
