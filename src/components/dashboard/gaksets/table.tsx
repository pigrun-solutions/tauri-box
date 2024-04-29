import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { Gasket } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useGasketsStore } from '@/zustand/gasket-store'
import { createEditGasket, getAllGaskets } from '@/database/gaskets'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GasketsTable() {
    const { gaskets, setGaskets } = useGasketsStore()

    const title = 'Gaskets'
    const count = gaskets.length

    const rows: GridRowsProp = gaskets

    const AddNew = async () => {
        const data = { name: 'blank' }
        await createEditGasket(data)
        const response = await getAllGaskets()
        if (response.error) return toast.error(response.error as string)

        setGaskets(response.data as Gasket[])
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
                                    const originalRow = gaskets.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditGasket(updatedRow)

                                        const response = await getAllGaskets()

                                        const updatedGasket = response.data as Gasket[]
                                        setGaskets(updatedGasket)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedGasket.find(r => r.id === updatedRow.id)
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
