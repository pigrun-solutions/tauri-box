import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { GasketVariants } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useGasketVariantsStore } from '@/zustand/gasket-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditGasketVariant, getAllGasketVariants } from '@/database/gaskets'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GasketVariantsTable({ gasketId }: { gasketId: string }) {
    const { gasketVariants, setGasketVariants } = useGasketVariantsStore()

    const title = 'Gasket Variants'
    const count = gasketVariants.length

    const rows: GridRowsProp = gasketVariants

    const AddNew = async () => {
        const data = { gasketId, diameterInch: 0, cost: 0 }
        await createEditGasketVariant(data)
        const response = await getAllGasketVariants(gasketId)
        if (response.error) return toast.error(response.error as string)

        setGasketVariants(response.data as GasketVariants[])
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
                                    const originalRow = gasketVariants.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0 || updatedRow[key] === null) updatedRow[key] = 0

                                        await createEditGasketVariant(updatedRow)

                                        const response = await getAllGasketVariants(gasketId)

                                        const updatedGasketVariant = response.data as GasketVariants[]
                                        setGasketVariants(updatedGasketVariant)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedGasketVariant.find(r => r.id === updatedRow.id)
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
