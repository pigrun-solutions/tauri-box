import { columns } from './columns'
import NoProducts from '@/components/ui/no-products'
import { DataTable } from '@/components/ui/data-table'
import { useCustomersStore } from '@/zustand/customers-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CustomersTable = () => {
    const { customers } = useCustomersStore()
    const count = customers.length

    return (
        <>
            {customers.length === 0 ? (
                <NoProducts title={'Customers'} addNew={() => {}} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Customers</CardTitle>
                        <CardDescription>
                            Total of <span className="font-bold">{count}</span> Customers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={customers} visibleColumns={{ id: false }} />
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export default CustomersTable
