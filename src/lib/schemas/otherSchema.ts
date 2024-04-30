import { z } from 'zod'

const otherSchema = z.object({
    labourRate: z.number().default(95.0),
    wastage: z.number().default(15.0),
    nameplate: z.number().default(600.0),
    pattern: z.number().default(8.0),
    usage: z.number().default(20.0),

    ladderClipsCost: z.number().default(360.0),
    ladderClipsLbs: z.number().default(20.0),
    ladderClipsHrs: z.number().default(7.5),

    manwayHingesCost: z.number().default(800.0),
    manwayHingesLbs: z.number().default(30.0),
    manwayHingesHrs: z.number().default(15.0),

    manwayDavitsCost: z.number().default(800.0),
    manwayDavitsLbs: z.number().default(30.0),
    manwayDavitsHrs: z.number().default(15.0),

    layupRateSqFt: z.number().default(6.0),

    balsaThickness1: z.number().default(0.5),
    balsaThickness2: z.number().default(0.75),
    balsaThickness3: z.number().default(1.0),
    balsaThickness4: z.number().default(1.5),
    balsaThickness5: z.number().default(2.0),

    balsaCost1: z.number().default(3.5),
    balsaCost2: z.number().default(4.25),
    balsaCost3: z.number().default(4.85),
    balsaCost4: z.number().default(7.25),
    balsaCost5: z.number().default(9.36),
})

export default otherSchema
