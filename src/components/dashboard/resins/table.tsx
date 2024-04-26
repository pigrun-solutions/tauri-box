import { kgToLbs } from '@/lib/utils'
import { Resin } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useResinStore } from '@/zustand/resin-store'
import { createEditResin, getAllResins } from '@/database/resin'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

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
        editable: false,
        valueGetter: (_, row) => kgToLbs(row.costKg).toFixed(2),
    },
    {
        field: 'densityGmCc',
        headerName: 'Density gm/cm',
        type: 'number',
        width: 180,
        editable: true,
        valueSetter: (newValue, oldRow) => {
            const updatedValue = parseFloat(newValue)
            if (updatedValue < 1) {
                toast.error('Density must be greater than 1')
                return oldRow.densityGmCc
            }
            const updatedRow = { ...oldRow, densityGmCc: updatedValue }
            return updatedRow
        },
    },
]

export default function ResinTable() {
    const { resin, setResin } = useResinStore()

    const title = 'Resin'
    const count = resin.length

    const rows: GridRowsProp = resin

    return (
        <>
            {count === 0 ? (
                <NoProducts title={title} />
            ) : (
                <Card className="max-h-screen flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                        <CardDescription>
                            Total of <span className="font-bold">{count}</span> {title.toLowerCase()} found
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-0 pb-0">
                        <div className="grow h-full bg-background rounded-md">
                            <DataGrid
                                editMode="row"
                                rows={rows}
                                columns={columns}
                                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                                pageSizeOptions={[10, 25, 50, 100]}
                                processRowUpdate={async updatedRow => {
                                    const originalRow = resin.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditResin(updatedRow)
                                        const response = await getAllResins()
                                        toast.success('Resin updated successfully!')
                                        const updatedResin = response.data as Resin[]
                                        setResin(updatedResin)
                                        return updatedResin.find(r => r.id === updatedRow.id)
                                    } else return originalRow
                                }}
                                onProcessRowUpdateError={(params): void => console.log(params)}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}
