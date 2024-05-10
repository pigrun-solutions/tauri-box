import { z } from 'zod'

const singleBoxSchema = z.object({
    deviceType: z.string(),
    uid: z.string(),
    passage: z.string(),
    checkin: z.string(),
})

export default singleBoxSchema
