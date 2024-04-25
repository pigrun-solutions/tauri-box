import { Additive } from '@/types/types'
import { getAdditive } from '@/database/additives'
import { createFileRoute } from '@tanstack/react-router'
import AdditiveForm from '@/components/dashboard/additives/slug/additive-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/additives/$id')({
    beforeLoad: async ({ params }) => await getAdditive(params.id),

    loader: async ({ params }) => await getAdditive(params.id),
    component: () => <AdditivePage />,
})

const AdditivePage = () => {
    const props = Route.useLoaderData()
    const additive = props.data as Additive | undefined

    return (
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
            <AdditiveForm initialData={additive} />
        </div>
    )
}
