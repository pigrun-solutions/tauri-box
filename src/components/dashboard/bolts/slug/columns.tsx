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
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(3)
            return roundedValue
        },
    },
    {
        field: 'lengthInch',
        headerName: 'Leng. in.',
        type: 'number',
        width: 150,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(3)
            return roundedValue
        },
    },
    {
        field: 'boltCost',
        headerName: 'Bolt $',
        type: 'number',
        width: 150,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'nutCost',
        headerName: 'Nut $',
        type: 'number',
        width: 150,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'washerCost',
        headerName: 'Washer $',
        type: 'number',
        width: 150,
        editable: true,
        valueFormatter: params => {
            const roundedValue = Number(params).toFixed(2)
            return roundedValue
        },
    },
    {
        field: 'total',
        headerName: 'Total $',
        type: 'number',
        width: 150,
        editable: false,
        renderCell: params => {
            return '$ ' + (params.row.boltCost + params.row.nutCost + params.row.washerCost).toFixed(2)
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
