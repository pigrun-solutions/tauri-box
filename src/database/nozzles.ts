import Database from 'tauri-plugin-sql-api'
import { Nozzle, NozzleVariants } from '@/types/types'

type NozzleProps = {
    id?: string
    name: string
}
type NozzleVariantsProps = {
    id?: string
    nozzleId: string
    variantId: number
    od: number
    bc: number
    boltsNum: number
    diameter: number
    flgT: number
    cost: number
    blindCost: number
    nozWtLbs: number
    welWtLbs: number
    labHours: number
}

export default async function useNozzle() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute('DROP TABLE Nozzle')
    // await db.execute('DROP TABLE NozzleVariants')
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Nozzle (
            id INTEGER PRIMARY KEY autoincrement,
            name VARCHAR(255) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )
    await db.execute(
        `CREATE TABLE IF NOT EXISTS NozzleVariants (
            id INTEGER PRIMARY KEY autoincrement,
            nozzleId VARCHAR(191),
            variantId REAL DEFAULT 0.00,
            od REAL DEFAULT 0.00,
            bc REAL DEFAULT 0.00,
            boltsNum INTEGER DEFAULT 0,
            weldWtLbs REAL DEFAULT 0.00,
            diameter REAL DEFAULT 0.00,
            flgT REAL DEFAULT 0.00,
            cost REAL DEFAULT 0.00,
            blindCost REAL DEFAULT 0.00,
            nozWtLbs REAL DEFAULT 0.00,
            welWtLbs REAL DEFAULT 0.00,
            labHours REAL DEFAULT 0.00,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (nozzleId) REFERENCES Nozzle(id)
        )`
    )

    return db
}

// ? GET
export const getAllNozzles = async () => {
    try {
        const db = await useNozzle()

        const data = (await db.select('SELECT * FROM Nozzle')) as Nozzle[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getAllNozzleVariants = async (nozzleId: string) => {
    try {
        const db = await useNozzle()

        const data = (await db.select('SELECT * FROM NozzleVariants WHERE nozzleId = $1', [nozzleId])) as NozzleVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getNozzle = async (id: string) => {
    try {
        const db = await useNozzle()

        const data = (await db.select('SELECT * FROM Nozzle WHERE id = $1', [id])) as Nozzle[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getNozzleVariant = async (id: string) => {
    try {
        const db = await useNozzle()

        const data = (await db.select('SELECT * FROM NozzleVariants WHERE id = $1', [id])) as NozzleVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PATCH
export const createEditNozzle = async (data: NozzleProps) => {
    try {
        const db = await useNozzle()
        const { id, name } = data
        if (id) {
            const exists = await db.select('SELECT * from Nozzle WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Nozzle SET name = $1 WHERE id = $2', [name, id])
        } else await db.execute('INSERT into Nozzle (name) VALUES ($1)', [name])
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditNozzleVariant = async (data: NozzleVariantsProps) => {
    try {
        const db = await useNozzle()
        const { id, nozzleId, variantId, od, bc, boltsNum, diameter, flgT, cost, blindCost, nozWtLbs, welWtLbs, labHours } = data
        if (id) {
            const exists = await db.select('SELECT * from NozzleVariants WHERE id = $1', [id])
            if (exists)
                await db.execute(
                    'UPDATE NozzleVariants SET nozzleId = $1, variantId = $2, od = $3, bc = $4, boltsNum = $5, diameter = $6, flgT = $7, cost = $8, blindCost = $9, nozWtLbs = $10, welWtLbs = $11, labHours = $12 WHERE id = $13',
                    [nozzleId, variantId, od, bc, boltsNum, diameter, flgT, cost, blindCost, nozWtLbs, welWtLbs, labHours, id]
                )
        } else
            await db.execute(
                'INSERT into NozzleVariants (nozzleId, variantId, od, bc, boltsNum, diameter, flgT, cost, blindCost, nozWtLbs, welWtLbs, labHours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
                [nozzleId, variantId, od, bc, boltsNum, diameter, flgT, cost, blindCost, nozWtLbs, welWtLbs, labHours]
            )
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteNozzle = async (id: string) => {
    try {
        const db = await useNozzle()

        const nozzleVariants = (await db.select('SELECT * FROM NozzleVariants WHERE nozzleId = $1', [id])) as NozzleVariants[]
        if (nozzleVariants.length > 0) await db.execute('DELETE FROM NozzleVariants WHERE nozzleId = $1', [id])

        await db.execute('DELETE FROM Nozzle WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM Nozzle')) as Nozzle[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteNozzleVariant = async (id: string) => {
    try {
        const db = await useNozzle()

        const nozzleVariants = (await db.select('SELECT * FROM NozzleVariants WHERE id = $1', [id])) as NozzleVariants[]

        await db.execute('DELETE FROM NozzleVariants WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM NozzleVariants WHERE nozzleId = $1', [nozzleVariants[0].nozzleId])) as NozzleVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
