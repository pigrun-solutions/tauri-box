import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Bolt } from '@/types/types'
import { Button } from '@mui/material'
import NoProducts from '@/components/ui/no-products'
import { useBoltsStore } from '@/zustand/bolts-store'
import { createEditBolt, getAllBolts } from '@/database/bolts'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BoltsTable() {
    const { bolts, setBolts } = useBoltsStore()

    const title = 'Bolts'
    const count = bolts.length

    const rows: GridRowsProp = bolts

    const AddNew = async () => {
        const data = { name: 'blank' }
        await createEditBolt(data)
        const response = await getAllBolts()
        if (response.error) return toast.error(response.error as string)

        setBolts(response.data as Bolt[])
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
                                    const originalRow = bolts.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditBolt(updatedRow)

                                        const response = await getAllBolts()

                                        const updatedBolt = response.data as Bolt[]
                                        setBolts(updatedBolt)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedBolt.find(r => r.id === updatedRow.id)
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
