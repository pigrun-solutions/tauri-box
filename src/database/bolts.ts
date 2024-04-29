import Database from 'tauri-plugin-sql-api'
import { Bolt, BoltVariants } from '@/types/types'

type BoltProps = {
    id?: string
    name: string
}
type BoltVariantProps = {
    id?: string
    boltId: string
    diameterInch: number
    lengthInch: number
    boltCost: number
    nutCost: number
    washerCost: number
}

export default async function useBolt() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Bolts`)
    // await db.execute(`DROP TABLE BoltVariants`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Bolts (
                id INTEGER PRIMARY KEY autoincrement,
                name VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
              )`
    )
    await db.execute(
        `CREATE TABLE IF NOT EXISTS BoltVariants (
                id INTEGER PRIMARY KEY autoincrement,
                boltId VARCHAR(191),
                diameterInch REAL DEFAULT 0.00,
                lengthInch REAL DEFAULT 0.00,
                boltCost REAL DEFAULT 0.00,
                nutCost REAL DEFAULT 0.00,
                washerCost REAL DEFAULT 0.00,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (boltId) REFERENCES Bolts(id)
              )`
    )

    return db
}

// ? GET
export const getAllBolts = async () => {
    try {
        const db = await useBolt()

        const data = (await db.select('SELECT * FROM Bolts')) as Bolt[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getAllBoltVariants = async (boltId: string) => {
    try {
        const db = await useBolt()

        const data = (await db.select('SELECT * FROM BoltVariants WHERE boltId = $1', [boltId])) as BoltVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getBolt = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useBolt()

            const data = (await db.select('SELECT * from Bolts WHERE id = $1', [id])) as Bolt[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}
export const getBoltVariant = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useBolt()

            const data = (await db.select('SELECT * from BoltVariants WHERE id = $1', [id])) as BoltVariants[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PATCH
export const createEditBolt = async (data: BoltProps) => {
    try {
        const db = await useBolt()

        const { id, name } = data

        if (id) {
            const exists = await db.select('SELECT * from Bolts WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Bolts SET name = $1 WHERE id = $2', [name, id])
        } else await db.execute('INSERT into Bolts (name) VALUES ($1)', [name])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditBoltVariant = async (data: BoltVariantProps) => {
    try {
        const db = await useBolt()

        const { id, boltId, diameterInch, lengthInch, boltCost, nutCost, washerCost } = data

        if (id) {
            const exists = await db.select('SELECT * from BoltVariants WHERE id = $1', [id])
            if (exists)
                await db.execute('UPDATE BoltVariants SET boltId = $1, diameterInch = $2, lengthInch = $3, boltCost = $4, nutCost = $5, washerCost = $6 WHERE id = $7', [
                    boltId,
                    diameterInch,
                    lengthInch,
                    boltCost,
                    nutCost,
                    washerCost,
                    id,
                ])
        } else
            await db.execute('INSERT into BoltVariants (boltId, diameterInch, lengthInch, boltCost, nutCost, washerCost) VALUES ($1, $2, $3, $4, $5, $6)', [
                boltId,
                diameterInch,
                lengthInch,
                boltCost,
                nutCost,
                washerCost,
            ])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteBolt = async (id: string) => {
    try {
        const db = await useBolt()

        const boltVariants = (await db.select('SELECT * from BoltVariants WHERE boltId = $1', [id])) as BoltVariants[]
        if (boltVariants.length > 0) await db.execute('DELETE from BoltVariants WHERE boltId = $1', [id])

        await db.execute('DELETE from Bolts WHERE id = $1', [id])

        const data = await db.select('SELECT * from Bolts')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteBoltVariant = async (id: string) => {
    try {
        const db = await useBolt()

        const boltVariant = (await db.select('SELECT * from BoltVariants WHERE id = $1', [id])) as BoltVariants[]

        await db.execute('DELETE from BoltVariants WHERE id = $1', [id])

        const data = await db.select('SELECT * from BoltVariants WHERE boltId = $1', [boltVariant[0].boltId])

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
