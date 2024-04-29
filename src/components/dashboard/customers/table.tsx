import { toast } from 'sonner'
import { columns } from './columns'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { Customer } from '@/types/types'
import NoProducts from '@/components/ui/no-products'
import { useCustomersStore } from '@/zustand/customers-store'
import { DataGrid, GridRowsProp, GridSlots } from '@mui/x-data-grid'
import { createEditCustomerName, getAllCustomers } from '@/database/customers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CustomersTable = () => {
    const { customers, setCustomers } = useCustomersStore()

    const title = 'Customers'
    const count = customers.length

    const rows: GridRowsProp = customers

    const AddNew = async () => {
        const data = { name: 'blank' }
        await createEditCustomerName(data)
        const response = await getAllCustomers()
        if (response.error) return toast.error(response.error as string)

        setCustomers(response.data as Customer[])
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
            {customers.length === 0 ? (
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
                                    const originalRow = customers.find(r => r.id === updatedRow.id)
                                    if (originalRow && JSON.stringify(originalRow) !== JSON.stringify(updatedRow)) {
                                        await createEditCustomerName(updatedRow)

                                        const response = await getAllCustomers()

                                        const updatedCustomers = response.data as Customer[]
                                        setCustomers(updatedCustomers)

                                        toast.success(`${title} updated successfully!`)
                                        return updatedCustomers.find(r => r.id === updatedRow.id)
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

export default CustomersTable
