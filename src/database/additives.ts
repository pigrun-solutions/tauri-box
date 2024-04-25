import { Additive } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type AdditiveProps = {
    id?: string
    name: string
    costKg: number
    densityGmCc: number
}

export default async function useAdditive() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Additives`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Additives (id INTEGER PRIMARY KEY autoincrement, name TEXT UNIQUE, costKg REAL DEFAULT 0.00, densityGmCc REAL DEFAULT 1.00, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)`
    )

    return db
}

export const getAllAdditives = async () => {
    try {
        const db = await useAdditive()

        const data = (await db.select('SELECT * FROM Additives')) as Additive[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getAdditive = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useAdditive()

            const data = (await db.select('SELECT * from Additives WHERE id = $1', [id])) as Additive[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditAdditive = async (data: AdditiveProps) => {
    try {
        const db = await useAdditive()

        const { name, costKg, densityGmCc, id } = data

        if (id) {
            const exists = await db.select('SELECT * from Additives WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Additives SET name = $1, costKg = $2, densityGmCc = $3 WHERE id = $4', [name, costKg, densityGmCc, id])
        } else await db.execute('INSERT into Additives (name, costKg, densityGmCc) VALUES ($1, $2, $3)', [name, costKg, densityGmCc])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteAdditive = async (id: string) => {
    try {
        const db = await useAdditive()

        await db.execute('DELETE from Additives WHERE id = $1', [id])

        const data = await db.select('SELECT * from Additives')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
