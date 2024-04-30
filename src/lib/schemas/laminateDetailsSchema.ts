import { z } from 'zod'

const laminateDetailsSchema = z.object({
    atsLinear: z.number().default(100),
    atsNonLinear: z.number().default(100),
    afsLinear: z.number().default(100),
    afsNonLinear: z.number().default(100),
    atmLinear: z.number().default(1000),
    atmNonLinear: z.number().default(1000),
    afmLinear: z.number().default(1000),
    afmNonLinear: z.number().default(1000),

    htsLinear: z.number().default(100),
    htsNonLinear: z.number().default(100),
    hfsLinear: z.number().default(100),
    hfsNonLinear: z.number().default(100),
    htmLinear: z.number().default(1000),
    htmNonLinear: z.number().default(1000),
    hfmLinear: z.number().default(1000),
    hfmNonLinear: z.number().default(100),

    issLinear: z.number().default(30),
    issNonLinear: z.number().default(30),

    mtLinear: z.number().default(0.0),
    mtNonLinear: z.number().default(0.0),

    layupRate: z.number().default(1.0),

    clrName1: z.string(),
    clrName2: z.string(),
    clrOz1: z.number(),
    clrOz2: z.number(),

    swrName1: z.string(),
    swrName2: z.string(),
    swrName3: z.string(),
    swrName4: z.string(),
    swrOz1: z.number(),
    swrOz2: z.number(),
    swrOz3: z.number(),
    swrOz4: z.number(),
})

export default laminateDetailsSchema
