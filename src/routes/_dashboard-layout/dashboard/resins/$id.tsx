import { Resin } from '@/types/types'
import { getResin } from '@/database/resin'
import { createFileRoute } from '@tanstack/react-router'
import ResinForm from '@/components/dashboard/resins/slug/resin-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/resins/$id')({
    loader: async ({ params }) => await getResin(params.id),
    component: () => <ResinPage />,
})

const ResinPage = () => {
    const props = Route.useLoaderData()
    const resin = props.data as Resin | undefined

    return (
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
            <ResinForm initialData={resin} />
        </div>
    )
}
