import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { ManwayVariants } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useManwayVariantsStore } from '@/zustand/manways-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditManwayVariant, getAllManwayVariants } from '@/database/manways'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ManwayVariantsTable({ manwayId }: { manwayId: string }) {
    const { manwayVariants, setManwayVariants } = useManwayVariantsStore()

    const title = 'Manway Variants'
    const count = manwayVariants.length

    const rows: GridRowsProp = manwayVariants

    const AddNew = async () => {
        const data = { manwayId, sizeInch: 0, cost: 0, nozWtLbs: 0, weldWtLbs: 0, labHours: 0, diameter: 0, boltsNum: 0, length: 0 }
        await createEditManwayVariant(data)
        const response = await getAllManwayVariants(manwayId)
        if (response.error) return toast.error(response.error as string)

        setManwayVariants(response.data as ManwayVariants[])
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
                                    const originalRow = manwayVariants.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0) updatedRow[key] = 0
                                        updatedRow.boltsNum = parseInt(updatedRow.boltsNum as any)

                                        await createEditManwayVariant(updatedRow)

                                        const response = await getAllManwayVariants(manwayId)

                                        const updatedManwayVariants = response.data as ManwayVariants[]
                                        setManwayVariants(updatedManwayVariants)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedManwayVariants.find(r => r.id === updatedRow.id)
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
