import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { Additive } from '@/types/types'
import { kgToLbs, lbsToKg } from '@/lib/utils'
import NoProducts from '@/components/ui/no-products'
import { useAdditivesStore } from '@/zustand/additives-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditAdditive, getAllAdditives } from '@/database/additives'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AdditivesTable = () => {
    const { additives, setAdditives } = useAdditivesStore()

    const title = 'Additives'
    const count = additives.length

    const rows: GridRowsProp = additives

    const AddNew = async () => {
        const data = { name: 'blank', costKg: 0, costLbs: 0, densityGmCc: 1 }
        await createEditAdditive(data)
        const response = await getAllAdditives()
        if (response.error) return toast.error(response.error as string)

        setAdditives(response.data as Additive[])
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
            {additives.length === 0 ? (
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
                                    const originalRow = additives.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0) updatedRow[key] = 0
                                        const costKgUpdated = originalRow.costKg !== Number(updatedRow.costKg)
                                        const costLbsUpdated = originalRow.costLbs !== Number(updatedRow.costLbs)
                                        if (costKgUpdated) await createEditAdditive({ ...updatedRow, costKg: Number(updatedRow.costKg), costLbs: kgToLbs(Number(updatedRow.costKg)) })
                                        else if (costLbsUpdated) await createEditAdditive({ ...updatedRow, costKg: lbsToKg(Number(updatedRow.costLbs)), costLbs: Number(updatedRow.costLbs) })
                                        else await createEditAdditive(updatedRow)

                                        const response = await getAllAdditives()

                                        const upadtedAdditive = response.data as Additive[]
                                        setAdditives(upadtedAdditive)

                                        toast.success(`${title} updated successfully!`)
                                        return upadtedAdditive.find(r => r.id === updatedRow.id)
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

export default AdditivesTable
