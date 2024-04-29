import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { SightGlasses } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useSightGlassesStore } from '@/zustand/sightglasses-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditSightGlass, getAllSightGlasses } from '@/database/sightglasses'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SightGlassesTable() {
    const { sightGlasses, setSightGlasses } = useSightGlassesStore()

    const title = 'Sight Glasses'
    const count = sightGlasses.length

    const rows: GridRowsProp = sightGlasses

    const AddNew = async () => {
        const data = { name: 'blank' }
        await createEditSightGlass(data)
        const response = await getAllSightGlasses()
        if (response.error) return toast.error(response.error as string)

        setSightGlasses(response.data as SightGlasses[])
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
                                    const originalRow = sightGlasses.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditSightGlass(updatedRow)

                                        const response = await getAllSightGlasses()

                                        const updateSightGlass = response.data as SightGlasses[]
                                        setSightGlasses(updateSightGlass)

                                        toast.success(`${title} updated successfully!`)
                                        return updateSightGlass.find(r => r.id === updatedRow.id)
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
