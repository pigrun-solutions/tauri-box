import { Glass } from '@/types/types'
import { getGlass } from '@/database/glasses'
import { createFileRoute } from '@tanstack/react-router'
import GlassForm from '@/components/dashboard/glasses/slug/glass-form'

export const Route = createFileRoute('/_dashboard-layout/dashboard/glasses/$id')({
    loader: async ({ params }) => await getGlass(params.id),
    component: () => <GlassPage />,
})

const GlassPage = () => {
    const props = Route.useLoaderData()
    const additive = props.data as Glass | undefined

    return (
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
            <GlassForm initialData={additive} />
        </div>
    )
}
