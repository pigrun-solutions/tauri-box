import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { SightGlassVariants } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSightGlassVariantsStore } from '@/zustand/sightglasses-store'
import { createEditSightGlassVariant, getAllSightGlassVariants } from '@/database/sightglasses'

export default function SightGlassVariantsTable({ sightGlassId }: { sightGlassId: string }) {
    const { sightGlassVariants, setSightGlassVariants } = useSightGlassVariantsStore()

    const title = 'Sight Glass Variants'
    const count = sightGlassVariants.length

    const rows: GridRowsProp = sightGlassVariants

    const AddNew = async () => {
        const data = { sightGlassId, diameterInch: 0, cost: 0 }
        await createEditSightGlassVariant(data)
        const response = await getAllSightGlassVariants(sightGlassId)
        if (response.error) return toast.error(response.error as string)

        setSightGlassVariants(response.data as SightGlassVariants[])
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
                                    const originalRow = sightGlassVariants.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0 || updatedRow[key] === null) updatedRow[key] = 0

                                        await createEditSightGlassVariant(updatedRow)

                                        const response = await getAllSightGlassVariants(sightGlassId)

                                        const updatedSightGlassVariant = response.data as SightGlassVariants[]
                                        setSightGlassVariants(updatedSightGlassVariant)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedSightGlassVariant.find(r => r.id === updatedRow.id)
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
