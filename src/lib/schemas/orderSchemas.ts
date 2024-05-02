import { z } from 'zod'

const order1Schema = z.object({
    date: z.string().optional(),
    reference: z.string().optional(),
    rfq: z.string().optional(),

    customerName: z.string().optional(),
    customerAddress1: z.string().optional(),
    customerAddress2: z.string().optional(),
    customerAddress3: z.string().optional(),
    customerPhone: z.string().optional(),
    customerFax: z.string().optional(),
    customerContact: z.string().optional(),
    customerContactPhone: z.string().optional(),

    dwgName: z.string().optional(),
    dwgNo: z.string().optional(),
})

export default order1Schema

export const order3Schema = z.object({
    drawingRef: z.string().optional(),
    size: z.number(),
    press: z.number(),
    loc: z.number(),
    orient: z.number(),
    nozId: z.string().optional(),
    boltId: z.string().optional(),
    gasketId: z.string().optional(),
    blind: z.string().optional(),
})
