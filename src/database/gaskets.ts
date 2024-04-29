import Database from 'tauri-plugin-sql-api'
import { Gasket, GasketVariants } from '@/types/types'

type GasketProps = {
    id?: string
    name: string
}
type GasketVariantProps = {
    id?: string
    gasketId: string
    diameterInch: number
    cost: number
}

export default async function useGasket() {
    const db = await Database.load('sqlite:test.db')

    await db.execute(
        `CREATE TABLE IF NOT EXISTS Gasket (
            id INTEGER PRIMARY KEY autoincrement,
            name VARCHAR(255) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )
    await db.execute(
        `CREATE TABLE IF NOT EXISTS GasketVariants (
            id INTEGER PRIMARY KEY autoincrement,
            gasketId VARCHAR(191),
            diameterInch REAL DEFAULT 0.00,
            cost REAL DEFAULT 0.00,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (gasketId) REFERENCES Gasket(id)
        )`
    )

    return db
}

// ? GET
export const getAllGaskets = async () => {
    try {
        const db = await useGasket()

        const data = (await db.select('SELECT * FROM Gasket')) as Gasket[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getAllGasketVariants = async (gasketId: string) => {
    try {
        const db = await useGasket()

        const data = (await db.select('SELECT * FROM GasketVariants WHERE gasketId = $1', [gasketId])) as GasketVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getGasket = async (id: string) => {
    try {
        const db = await useGasket()

        const data = (await db.select('SELECT * FROM Gasket WHERE id = $1', [id])) as Gasket[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getGasketVariant = async (id: string) => {
    try {
        const db = await useGasket()

        const data = (await db.select('SELECT * FROM GasketVariants WHERE id = $1', [id])) as GasketVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PATCH
export const createEditGasket = async (data: GasketProps) => {
    try {
        const db = await useGasket()
        const { id, name } = data
        if (id) {
            const exists = await db.select('SELECT * from Gasket WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Gasket SET name = $1 WHERE id = $2', [name, id])
        } else await db.execute('INSERT into Gasket (name) VALUES ($1)', [name])
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditGasketVariant = async (data: GasketVariantProps) => {
    try {
        const db = await useGasket()

        const { id, diameterInch, gasketId, cost } = data

        if (id) {
            const exists = await db.select('SELECT * from GasketVariants WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE GasketVariants SET gasketId = $1, diameterInch = $2, cost = $3 WHERE id = $4', [gasketId, diameterInch, cost, id])
        } else await db.execute('INSERT into GasketVariants (gasketId, diameterInch, cost) VALUES ($1, $2, $3)', [gasketId, diameterInch, cost])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteGasket = async (id: string) => {
    try {
        const db = await useGasket()

        const gasketVariants = (await db.select('SELECT * FROM GasketVariants WHERE gasketId = $1', [id])) as GasketVariants[]
        if (gasketVariants.length > 0) await db.execute('DELETE FROM GasketVariants WHERE gasketId = $1', [id])

        await db.execute('DELETE FROM Gasket WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM Gasket')) as Gasket[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const deleteGasketVariant = async (id: string) => {
    try {
        const db = await useGasket()

        const gasketVariants = (await db.select('SELECT * FROM GasketVariants WHERE id = $1', [id])) as GasketVariants[]

        await db.execute('DELETE FROM GasketVariants WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM GasketVariants WHERE gasketId = $1', [gasketVariants[0].gasketId])) as GasketVariants[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
