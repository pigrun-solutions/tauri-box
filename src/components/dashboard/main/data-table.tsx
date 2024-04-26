import { useResinStore } from '@/zustand/resin-store'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'

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
]

export default function BasicRowEditingGrid() {
    const { resin } = useResinStore()

    const rows: GridRowsProp = resin

    return (
        <div className="w-full h-full bg-background rounded-md">
            <DataGrid
                editMode="row"
                rows={rows}
                columns={columns}
                processRowUpdate={updatedRow => {
                    console.log(updatedRow)
                    return resin.find(r => r.id === updatedRow.id)
                }}
                onProcessRowUpdateError={(params): void => {
                    console.log(params)
                }}
            />
        </div>
    )
}
