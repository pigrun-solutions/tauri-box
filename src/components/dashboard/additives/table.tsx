import { columns } from './columns'
import NoProducts from '@/components/ui/no-products'
import { DataTable } from '@/components/ui/data-table'
import { useAdditivesStore } from '@/zustand/additives-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AdditivesTable = () => {
    const { additives } = useAdditivesStore()
    const count = additives.length

    return (
        <>
            {additives.length === 0 ? (
                <NoProducts title={'Additives'} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Additives</CardTitle>
                        <CardDescription>
                            Total of <span className="font-bold">{count}</span> Additives
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={additives} visibleColumns={{ id: false }} />
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export default AdditivesTable
