import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { Ledge } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useLedgeStore } from '@/zustand/ledges-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createEditLedge, getAllLedges } from '@/database/ledges'

export default function LedgesTable() {
    const { ledges, setLedges } = useLedgeStore()

    const title = 'Ledges'
    const count = ledges.length

    const rows: GridRowsProp = ledges

    const AddNew = async () => {
        const data = { type: 'blank', wtLbs: 0, layupRateLbs: 0 }
        await createEditLedge(data)
        const response = await getAllLedges()
        if (response.error) return toast.error(response.error as string)

        setLedges(response.data as Ledge[])
        toast.success(`${title} added successfully!`)
    }
    function EditToolbar() {
        return (
            <div className="flex">
                <Button color="primary" startIcon={<Plus />} onClick={AddNew}>
                    Add New
                </Button>
            </div>
        )
    }

    return (
        <>
            {count === 0 ? (
                <NoProducts title={title} addNew={AddNew} />
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
                                pageSizeOptions={[10, 25, 50, 100]}
                                columnVisibilityModel={{ id: false }}
                                slots={{ toolbar: EditToolbar as GridSlots['toolbar'] }}
                                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                                processRowUpdate={async updatedRow => {
                                    const originalRow = ledges.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0) updatedRow[key] = 0

                                        await createEditLedge(updatedRow)

                                        const response = await getAllLedges()

                                        const updatedLedge = response.data as Ledge[]
                                        setLedges(updatedLedge)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedLedge.find(r => r.id === updatedRow.id)
                                    } else return originalRow
                                }}
                                onProcessRowUpdateError={(params): void => console.error(params)}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}
