import { z } from 'zod'

const geoSchema = z.object({
    id: z.number().optional(),
    lat: z.number(),
    long: z.number(),
    coilFreq: z.number(),
    geoFreq: z.number(),
    duration: z.number(),
})

export default geoSchema
