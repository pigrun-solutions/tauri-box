import { columns } from './columns'
import NoProducts from '@/components/ui/no-products'
import { DataTable } from '@/components/ui/data-table'
import { useGlassesStore } from '@/zustand/glasses-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const GlassesTable = () => {
    const { glasses } = useGlassesStore()
    const title = 'Glasses'
    const count = glasses.length

    return (
        <>
            {glasses.length === 0 ? (
                <NoProducts title={title} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                            Total of <span className="font-bold">{count}</span> {title.toLowerCase()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={glasses} visibleColumns={{ id: false }} />
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export default GlassesTable
