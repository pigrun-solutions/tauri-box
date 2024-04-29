import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { Laminate } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useLaminateStore } from '@/zustand/laminate-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditLaminate, getAllLaminates } from '@/database/laminates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LaminatesTable() {
    const { laminates, setLaminates } = useLaminateStore()

    const title = 'Laminates'
    const count = laminates.length

    const rows: GridRowsProp = laminates

    const AddNew = async () => {
        const data = { name: 'blank' }
        await createEditLaminate(data)
        const response = await getAllLaminates()
        if (response.error) return toast.error(response.error as string)

        setLaminates(response.data as Laminate[])
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
                                    const originalRow = laminates.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditLaminate(updatedRow)

                                        const response = await getAllLaminates()

                                        const updatedLaminate = response.data as Laminate[]
                                        setLaminates(updatedLaminate)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedLaminate.find(r => r.id === updatedRow.id)
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
