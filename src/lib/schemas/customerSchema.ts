import { z } from 'zod'

const customerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email().optional(),
    phone: z.string().min(8, 'At least 8 digits'),
    fax: z.string().min(8, 'At least 8 digits').optional(),
    contact: z.string().min(4, 'At least 8 digits').optional(),
    address: z.string().optional(),
})

export default customerSchema
