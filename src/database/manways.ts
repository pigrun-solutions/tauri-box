import Database from 'tauri-plugin-sql-api'
import { Manway, ManwayVariants } from '@/types/types'

type ManwayProps = {
    id?: string
    name: string
}
type ManwayVariantProps = {
    id?: string
    manwayId: string
    sizeInch: number
    cost: number
    nozWtLbs: number
    weldWtLbs: number
    labHours: number
    diameter: number
    boltsNum: number
    length: number
}

export default async function useManway() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute('DROP TABLE Manway')
    // await db.execute('DROP TABLE ManwayVariants')
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Manway (
            id INTEGER PRIMARY KEY autoincrement,
            name VARCHAR(255) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )
    await db.execute(
        `CREATE TABLE IF NOT EXISTS ManwayVariants (
            id INTEGER PRIMARY KEY autoincrement,
            manwayId VARCHAR(191),
            sizeInch REAL DEFAULT 0.00,
            cost REAL DEFAULT 0.00,
            nozWtLbs REAL DEFAULT 0.00,
            weldWtLbs REAL DEFAULT 0.00,
            labHours REAL DEFAULT 0.00,
            diameter REAL DEFAULT 0.00,
            boltsNum INTEGER DEFAULT 0,
            length REAL DEFAULT 0.00,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (manwayId) REFERENCES Manway(id)
        )`
    )

    return db
}

// ? GET
export const getAllManways = async () => {
    try {
        const db = await useManway()

        const data = (await db.select('SELECT * FROM Manway')) as Manway[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getAllManwayVariants = async (manwayId: string) => {
    try {
        const db = await useManway()

        const data = (await db.select('SELECT * FROM ManwayVariants WHERE manwayId = $1', [manwayId])) as ManwayVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getManway = async (id: string) => {
    try {
        const db = await useManway()

        const data = (await db.select('SELECT * FROM Manway WHERE id = $1', [id])) as Manway[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getManwayVariant = async (id: string) => {
    try {
        const db = await useManway()

        const data = (await db.select('SELECT * FROM ManwayVariants WHERE id = $1', [id])) as ManwayVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PATCH
export const createEditManway = async (data: ManwayProps) => {
    try {
        const db = await useManway()
        const { id, name } = data
        if (id) {
            const exists = await db.select('SELECT * from Manway WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Manway SET name = $1 WHERE id = $2', [name, id])
        } else await db.execute('INSERT into Manway (name) VALUES ($1)', [name])
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditManwayVariant = async (data: ManwayVariantProps) => {
    try {
        const db = await useManway()
        const { id, manwayId, sizeInch, cost, nozWtLbs, weldWtLbs, labHours, diameter, boltsNum, length } = data
        if (id) {
            const exists = await db.select('SELECT * from ManwayVariants WHERE id = $1', [id])
            if (exists)
                await db.execute(
                    'UPDATE ManwayVariants SET manwayId = $1, sizeInch = $2, cost = $3, nozWtLbs = $4, weldWtLbs = $5, labHours = $6, diameter = $7, boltsNum = $8, length = $9 WHERE id = $10',
                    [manwayId, sizeInch, cost, nozWtLbs, weldWtLbs, labHours, diameter, boltsNum, length, id]
                )
        } else
            await db.execute('INSERT into ManwayVariants (manwayId, sizeInch, cost, nozWtLbs, weldWtLbs, labHours, diameter, boltsNum, length) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                manwayId,
                sizeInch,
                cost,
                nozWtLbs,
                weldWtLbs,
                labHours,
                diameter,
                boltsNum,
                length,
            ])
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteManway = async (id: string) => {
    try {
        const db = await useManway()

        const manwayVariants = (await db.select('SELECT * FROM ManwayVariants WHERE manwayId = $1', [id])) as ManwayVariants[]
        if (manwayVariants.length > 0) await db.execute('DELETE FROM ManwayVariants WHERE manwayId = $1', [id])

        await db.execute('DELETE FROM Manway WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM Manway')) as Manway[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteManwayVariant = async (id: string) => {
    try {
        const db = await useManway()

        const manwayVariants = (await db.select('SELECT * FROM ManwayVariants WHERE id = $1', [id])) as ManwayVariants[]

        await db.execute('DELETE FROM ManwayVariants WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM ManwayVariants WHERE manwayId = $1', [manwayVariants[0].manwayId])) as ManwayVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
