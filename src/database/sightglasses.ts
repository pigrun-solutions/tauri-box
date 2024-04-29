import Database from 'tauri-plugin-sql-api'
import { SightGlasses, SightGlassVariants } from '@/types/types'

type SightGlassProps = {
    id?: string
    name: string
}
type SightGlassVariantProps = {
    id?: string
    sightGlassId: string
    diameterInch: number
    cost: number
}

export default async function useSightGlass() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE SightGlasses`)
    // await db.execute(`DROP TABLE SightGlassVariants`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS SightGlasses (
                id INTEGER PRIMARY KEY autoincrement,
                name VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
              )`
    )
    await db.execute(
        `CREATE TABLE IF NOT EXISTS SightGlassVariants (
                id INTEGER PRIMARY KEY autoincrement,
                sightGlassId VARCHAR(191),
                diameterInch REAL DEFAULT 0.00,
                cost REAL DEFAULT 0.00,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (sightGlassId) REFERENCES SightGlasses(id)
              )`
    )

    return db
}

// ? GET
export const getAllSightGlasses = async () => {
    try {
        const db = await useSightGlass()

        const data = (await db.select('SELECT * FROM SightGlasses')) as SightGlasses[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getAllSightGlassVariants = async (sightGlassId: string) => {
    try {
        const db = await useSightGlass()

        const data = (await db.select('SELECT * FROM SightGlassVariants WHERE sightGlassId = $1', [sightGlassId])) as SightGlassVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getSightGlass = async (id: string) => {
    try {
        const db = await useSightGlass()

        const data = (await db.select('SELECT * FROM SightGlasses WHERE id = $1', [id])) as SightGlasses[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getSightGlassVariant = async (id: string) => {
    try {
        const db = await useSightGlass()

        const data = (await db.select('SELECT * FROM SightGlassVariants WHERE id = $1', [id])) as SightGlassVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PATCH
export const createEditSightGlass = async (data: SightGlassProps) => {
    try {
        const db = await useSightGlass()

        const { id, name } = data

        if (id) {
            const exists = await db.select('SELECT * from SightGlasses WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE SightGlasses SET name = $1 WHERE id = $2', [name, id])
        } else await db.execute('INSERT into SightGlasses (name) VALUES ($1)', [name])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditSightGlassVariant = async (data: SightGlassVariantProps) => {
    try {
        const db = await useSightGlass()

        const { id, diameterInch, sightGlassId, cost } = data

        if (id) {
            const exists = await db.select('SELECT * from SightGlassVariants WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE SightGlassVariants SET sightGlassId = $1, diameterInch = $2, cost = $3 WHERE id = $4', [sightGlassId, diameterInch, cost, id])
        } else await db.execute('INSERT into SightGlassVariants (sightGlassId, diameterInch, cost) VALUES ($1, $2, $3)', [sightGlassId, diameterInch, cost])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteSightGlass = async (id: string) => {
    try {
        const db = await useSightGlass()

        const sightGlassVariants = (await db.select('SELECT * FROM SightGlassVariants WHERE sightGlassId = $1', [id])) as SightGlassVariants[]
        if (sightGlassVariants.length > 0) await db.execute('DELETE FROM SightGlassVariants WHERE sightGlassId = $1', [id])

        await db.execute('DELETE FROM SightGlasses WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM SightGlasses')) as SightGlasses[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteSightGlassVariant = async (id: string) => {
    try {
        const db = await useSightGlass()

        const sightGlassVariants = (await db.select('SELECT * FROM SightGlassVariants WHERE id = $1', [id])) as SightGlassVariants[]

        await db.execute('DELETE FROM SightGlassVariants WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM SightGlassVariants WHERE sightGlassId = $1', [sightGlassVariants[0].sightGlassId])) as SightGlassVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
