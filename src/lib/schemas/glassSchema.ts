import { z } from 'zod'

const glassSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    costKg: z.coerce.number().min(0.0).default(0.0),
})

export default glassSchema
