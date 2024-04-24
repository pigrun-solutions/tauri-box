import { z } from 'zod'

const loginSchema = z.object({
    password: z.string().min(7, 'Password must be at least 7 characters long.'),
})

export default loginSchema
