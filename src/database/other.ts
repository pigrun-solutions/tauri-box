import { Other } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type OtherProps = {
    id?: string
    labourRate: number
    wastage: number
    nameplate: number
    pattern: number
    usage: number

    ladderClipsCost: number
    ladderClipsLbs: number
    ladderClipsHrs: number

    manwayHingesCost: number
    manwayHingesLbs: number
    manwayHingesHrs: number

    manwayDavitsCost: number
    manwayDavitsLbs: number
    manwayDavitsHrs: number

    layupRateSqFt: number

    balsaThickness1: number
    balsaThickness2: number
    balsaThickness3: number
    balsaThickness4: number
    balsaThickness5: number

    balsaCost1: number
    balsaCost2: number
    balsaCost3: number
    balsaCost4: number
    balsaCost5: number
}

async function doesTableExist(db: any): Promise<boolean> {
    const result = await db.select(`SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name=?`, ['Other'])
    return result?.[0]?.count > 0
}
async function createTable(db: any) {
    await db.execute(
        `CREATE TABLE Other (
            id INTEGER PRIMARY KEY autoincrement, 
            labourRate REAL DEFAULT 95.00,
            wastage REAL DEFAULT 15.00,
            nameplate REAL DEFAULT 600.00,
            pattern REAL DEFAULT 8.00,
            usage REAL DEFAULT 20.00,
            ladderClipsCost REAL DEFAULT 360.00,
            ladderClipsLbs REAL DEFAULT 20.00,
            ladderClipsHrs REAL DEFAULT 7.5,
            manwayHingesCost REAL DEFAULT 800.00,
            manwayHingesLbs REAL DEFAULT 30.00,
            manwayHingesHrs REAL DEFAULT 15.00,
            manwayDavitsCost REAL DEFAULT 800.00,
            manwayDavitsLbs REAL DEFAULT 30.00,
            manwayDavitsHrs REAL DEFAULT 15.00,
            layupRateSqFt REAL DEFAULT 6.00,
            balsaThickness1 REAL DEFAULT 0.5,
            balsaThickness2 REAL DEFAULT 0.75,
            balsaThickness3 REAL DEFAULT 1.0,
            balsaThickness4 REAL DEFAULT 1.5,
            balsaThickness5 REAL DEFAULT 2.0,
            balsaCost1 REAL DEFAULT 3.5,
            balsaCost2 REAL DEFAULT 4.25,
            balsaCost3 REAL DEFAULT 4.85,
            balsaCost4 REAL DEFAULT 7.25,
            balsaCost5 REAL DEFAULT 9.36,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )
}
async function insertDefaultValues(db: any) {
    await db.execute(
        `INSERT INTO Other (labourRate, wastage, nameplate, pattern, usage, ladderClipsCost, ladderClipsLbs, ladderClipsHrs, manwayHingesCost, manwayHingesLbs, manwayHingesHrs, manwayDavitsCost, manwayDavitsLbs, manwayDavitsHrs, layupRateSqFt, balsaThickness1, balsaThickness2, balsaThickness3, balsaThickness4, balsaThickness5, balsaCost1, balsaCost2, balsaCost3, balsaCost4, balsaCost5) 
         VALUES (95.00, 15.00, 600.00, 8.00, 20.00, 360.00, 20.00, 7.5, 800.00, 30.00, 15.00, 800.00, 30.00, 15.00, 6.00, 0.5, 0.75, 1.0, 1.5, 2.0, 3.5, 4.25, 4.85, 7.25, 9.36)`
    )
}

export default async function useOther() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`Drop TABLE IF EXISTS Other`)
    const tableExists = await doesTableExist(db)
    if (!tableExists) {
        await createTable(db)
        await insertDefaultValues(db)
    }

    return db
}

// ? GET
export const getFristOther = async () => {
    try {
        const db = await useOther()

        const data = await db.select<Other[]>('SELECT * from Other LIMIT 1')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST
export const createEditOther = async (data: OtherProps) => {
    try {
        const db = await useOther()

        const {
            labourRate,
            wastage,
            nameplate,
            pattern,
            usage,
            ladderClipsCost,
            ladderClipsLbs,
            ladderClipsHrs,
            manwayHingesCost,
            manwayHingesLbs,
            manwayHingesHrs,
            manwayDavitsCost,
            manwayDavitsLbs,
            manwayDavitsHrs,
            layupRateSqFt,
            balsaThickness1,
            balsaThickness2,
            balsaThickness3,
            balsaThickness4,
            balsaThickness5,
            balsaCost1,
            balsaCost2,
            balsaCost3,
            balsaCost4,
            balsaCost5,
            id,
        } = data

        if (id) {
            const exists = await db.select('SELECT * from Other WHERE id = $1', [id])
            if (exists)
                await db.execute(
                    'UPDATE Other SET labourRate = $1, wastage = $2, nameplate = $3, pattern = $4, usage = $5, ladderClipsCost = $6, ladderClipsLbs = $7, ladderClipsHrs = $8, manwayHingesCost = $9, manwayHingesLbs = $10, manwayHingesHrs = $11, manwayDavitsCost = $12, manwayDavitsLbs = $13, manwayDavitsHrs = $14, layupRateSqFt = $15, balsaThickness1 = $16, balsaThickness2 = $17, balsaThickness3 = $18, balsaThickness4 = $19, balsaThickness5 = $20, balsaCost1 = $21, balsaCost2 = $22, balsaCost3 = $23, balsaCost4 = $24, balsaCost5 = $25 WHERE id = $26',
                    [
                        labourRate,
                        wastage,
                        nameplate,
                        pattern,
                        usage,
                        ladderClipsCost,
                        ladderClipsLbs,
                        ladderClipsHrs,
                        manwayHingesCost,
                        manwayHingesLbs,
                        manwayHingesHrs,
                        manwayDavitsCost,
                        manwayDavitsLbs,
                        manwayDavitsHrs,
                        layupRateSqFt,
                        balsaThickness1,
                        balsaThickness2,
                        balsaThickness3,
                        balsaThickness4,
                        balsaThickness5,
                        balsaCost1,
                        balsaCost2,
                        balsaCost3,
                        balsaCost4,
                        balsaCost5,
                        id,
                    ]
                )
        } else
            await db.execute(
                'INSERT into Other (labourRate, wastage, nameplate, pattern, usage, ladderClipsCost, ladderClipsLbs, ladderClipsHrs, manwayHinges , manwayHingesLbs, manwayHingesHrs, manwayDavits , manwayDavitsLbs, manwayDavitsHrs, layupRateSqFt, balsaThickness1, balsaThickness2, balsaThickness3, balsaThickness4, balsaThickness5, balsaCost1, balsaCost2, balsaCost3, balsaCost4, balsaCost5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)',
                [
                    labourRate,
                    wastage,
                    nameplate,
                    pattern,
                    usage,
                    ladderClipsCost,
                    ladderClipsLbs,
                    ladderClipsHrs,
                    manwayHingesCost,
                    manwayHingesLbs,
                    manwayHingesHrs,
                    manwayDavitsCost,
                    manwayDavitsLbs,
                    manwayDavitsHrs,
                    layupRateSqFt,
                    balsaThickness1,
                    balsaThickness2,
                    balsaThickness3,
                    balsaThickness4,
                    balsaThickness5,
                    balsaCost1,
                    balsaCost2,
                    balsaCost3,
                    balsaCost4,
                    balsaCost5,
                ]
            )

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
