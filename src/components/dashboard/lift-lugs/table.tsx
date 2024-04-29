import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { LiftLug } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useLiftLugsStore } from '@/zustand/liftlugs-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditLiftLug, getAllLiftLugs } from '@/database/liftlugs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LiftLugsTable() {
    const { liftlugs, setLiftLugs } = useLiftLugsStore()

    const title = 'Lift Lugs'
    const count = liftlugs.length

    const rows: GridRowsProp = liftlugs

    const AddNew = async () => {
        const data = { capacityLbs: 0, wtLbs: 0, labHours: 0 }
        await createEditLiftLug(data)
        const response = await getAllLiftLugs()
        if (response.error) return toast.error(response.error as string)

        setLiftLugs(response.data as LiftLug[])
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
                                    const originalRow = liftlugs.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        for (const key in updatedRow) if (updatedRow[key] < 0 || updatedRow[key] === null) updatedRow[key] = 0
                                        updatedRow.capacityLbs = parseInt(updatedRow.capacityLbs as any)

                                        await createEditLiftLug(updatedRow)

                                        const response = await getAllLiftLugs()

                                        const updatedLiftLug = response.data as LiftLug[]
                                        setLiftLugs(updatedLiftLug)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedLiftLug.find(r => r.id === updatedRow.id)
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
