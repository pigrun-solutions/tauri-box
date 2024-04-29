import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Vent } from '@/types/types'
import { Button } from '@mui/material'
import NoProducts from '@/components/ui/no-products'
import { useVentsStore } from '@/zustand/vents-store'
import { createEditVent, getAllVents } from '@/database/vents'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function VentsTable() {
    const { vents, setVents } = useVentsStore()

    const title = 'Vents'
    const count = vents.length

    const rows: GridRowsProp = vents

    const AddNew = async () => {
        const data = { diameterInch: 0, wtLbs: 0, labHours: 0, matCost: 0 }
        await createEditVent(data)
        const response = await getAllVents()
        if (response.error) return toast.error(response.error as string)

        setVents(response.data as Vent[])
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
                                    const originalRow = vents.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0) updatedRow[key] = 0

                                        await createEditVent(updatedRow)

                                        const response = await getAllVents()

                                        const updatedVent = response.data as Vent[]
                                        setVents(updatedVent)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedVent.find(r => r.id === updatedRow.id)
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
