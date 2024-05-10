import { z } from 'zod'

const multiBoxSchema = z
    .object({
        psg: z.boolean(),
        uidTo: z.number(),
        uidFrom: z.number(),
        checkin: z.boolean(),
        checkinTime: z.number().optional(),
    })
    .refine(data => data.uidFrom < data.uidTo, { message: 'uidFrom should be less than uidTo', path: ['uidFrom'] })

export default multiBoxSchema
