import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { NozzleVariants } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useNozzleVariantsStore } from '@/zustand/nozzles-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditNozzleVariant, getAllNozzleVariants } from '@/database/nozzles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NozzleVariantsTable({ nozzleId }: { nozzleId: string }) {
    const { nozzleVariants, setNozzleVariants } = useNozzleVariantsStore()

    const title = 'Nozzle Variants'
    const count = nozzleVariants.length

    const rows: GridRowsProp = nozzleVariants

    const AddNew = async () => {
        const data = { nozzleId, variantId: 0, od: 0, bc: 0, boltsNum: 0, diameter: 0, flgT: 0, cost: 0, blindCost: 0, nozWtLbs: 0, welWtLbs: 0, labHours: 0 }
        await createEditNozzleVariant(data)
        const response = await getAllNozzleVariants(nozzleId)
        if (response.error) return toast.error(response.error as string)

        setNozzleVariants(response.data as NozzleVariants[])
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
                                    const originalRow = nozzleVariants.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0 || updatedRow[key] === null) updatedRow[key] = 0
                                        updatedRow.boltsNum = parseInt(updatedRow.boltsNum as any)

                                        await createEditNozzleVariant(updatedRow)

                                        const response = await getAllNozzleVariants(nozzleId)

                                        const updatedNozzleVariant = response.data as NozzleVariants[]
                                        setNozzleVariants(updatedNozzleVariant)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedNozzleVariant.find(r => r.id === updatedRow.id)
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
