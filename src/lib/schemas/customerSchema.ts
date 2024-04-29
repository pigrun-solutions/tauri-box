import { z } from 'zod'

const customerSchema = z.object({
    address1: z.string().optional(),
    address2: z.string().optional(),
    address3: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    contact: z.string().optional(),
})

export default customerSchema
