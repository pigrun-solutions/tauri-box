import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { Nozzle } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useNozzleStore } from '@/zustand/nozzles-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditNozzle, getAllNozzles } from '@/database/nozzles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NozzleTable() {
    const { nozzles, setNozzles } = useNozzleStore()

    const title = 'Nozzles'
    const count = nozzles.length

    const rows: GridRowsProp = nozzles

    const AddNew = async () => {
        const data = { name: 'blank' }
        await createEditNozzle(data)
        const response = await getAllNozzles()
        if (response.error) return toast.error(response.error as string)

        setNozzles(response.data as Nozzle[])
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
                                    const originalRow = nozzles.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditNozzle(updatedRow)

                                        const response = await getAllNozzles()

                                        const updatedNozzles = response.data as Nozzle[]
                                        setNozzles(updatedNozzles)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedNozzles.find(r => r.id === updatedRow.id)
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
