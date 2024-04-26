import { z } from 'zod'

const resinSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    costKg: z.coerce.number().min(0.0).default(0.0),
    densityGmCc: z.coerce.number().min(0.0).default(1.0),
})

export default resinSchema
