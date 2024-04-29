import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Glass } from '@/types/types'
import { Button } from '@mui/material'
import { kgToLbs, lbsToKg } from '@/lib/utils'
import NoProducts from '@/components/ui/no-products'
import { useGlassesStore } from '@/zustand/glasses-store'
import { createEditGlass, getAllGlasses } from '@/database/glasses'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const GlassesTable = () => {
    const { glasses, setGlasses } = useGlassesStore()

    const title = 'Glasses'
    const count = glasses.length

    const rows: GridRowsProp = glasses
    const AddNew = async () => {
        const data = { name: 'blank', costKg: 0, costLbs: 0 }
        await createEditGlass(data)
        const response = await getAllGlasses()
        if (response.error) return toast.error(response.error as string)

        setGlasses(response.data as Glass[])
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
            {glasses.length === 0 ? (
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
                                    const originalRow = glasses.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0) updatedRow[key] = 0
                                        const costKgUpdated = originalRow.costKg !== Number(updatedRow.costKg)
                                        const costLbsUpdated = originalRow.costLbs !== Number(updatedRow.costLbs)
                                        if (costKgUpdated) await createEditGlass({ ...updatedRow, costKg: Number(updatedRow.costKg), costLbs: kgToLbs(Number(updatedRow.costKg)) })
                                        else if (costLbsUpdated) await createEditGlass({ ...updatedRow, costKg: lbsToKg(Number(updatedRow.costLbs)), costLbs: Number(updatedRow.costLbs) })
                                        else await createEditGlass(updatedRow)

                                        const response = await getAllGlasses()

                                        const updatedGlass = response.data as Glass[]
                                        setGlasses(updatedGlass)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedGlass.find(r => r.id === updatedRow.id)
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

export default GlassesTable
