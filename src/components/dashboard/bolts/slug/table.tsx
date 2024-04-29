import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { BoltVariants } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useBoltVariantsStore } from '@/zustand/bolts-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditBoltVariant, getAllBoltVariants } from '@/database/bolts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BoltVariantsTable({ boltId }: { boltId: string }) {
    const { boltVariants, setBoltVariants } = useBoltVariantsStore()

    const title = 'Bolt Variants'
    const count = boltVariants.length

    const rows: GridRowsProp = boltVariants

    const AddNew = async () => {
        const data = { boltId, diameterInch: 0, lengthInch: 0, boltCost: 0, nutCost: 0, washerCost: 0 }
        await createEditBoltVariant(data)
        const response = await getAllBoltVariants(boltId)
        if (response.error) return toast.error(response.error as string)

        setBoltVariants(response.data as BoltVariants[])
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
                                    const originalRow = boltVariants.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0 || updatedRow[key] === null) updatedRow[key] = 0

                                        await createEditBoltVariant(updatedRow)

                                        const response = await getAllBoltVariants(boltId)

                                        const updatedBoltVariant = response.data as BoltVariants[]
                                        setBoltVariants(updatedBoltVariant)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedBoltVariant.find(r => r.id === updatedRow.id)
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
