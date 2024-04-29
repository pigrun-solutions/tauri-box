import { Ledge } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type LedgeProps = {
    id?: string
    type: string
    wtLbs: number
    layupRateLbs: number
}

export default async function useLedge() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Ledges`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Ledges (
            id INTEGER PRIMARY KEY autoincrement, 
            type VARCHAR(255) NOT NULL,
            wtLbs REAL DEFAULT 0.00,
            layupRateLbs REAL DEFAULT 0.00, 
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db
}

export const getAllLedges = async () => {
    try {
        const db = await useLedge()

        const data = (await db.select('SELECT * FROM Ledges')) as Ledge[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getLedge = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useLedge()

            const data = (await db.select('SELECT * from Ledges WHERE id = $1', [id])) as Ledge[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditLedge = async (data: LedgeProps) => {
    try {
        const db = await useLedge()

        const { id, type, wtLbs, layupRateLbs } = data

        if (id) {
            const exists = await db.select('SELECT * from Ledges WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Ledges SET type = $1, wtLbs = $2, layupRateLbs= $3 WHERE id = $4', [type, wtLbs, layupRateLbs, id])
        } else await db.execute('INSERT into Ledges (type, wtLbs, layupRateLbs) VALUES ($1, $2, $3)', [type, wtLbs, layupRateLbs])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteLedge = async (id: string) => {
    try {
        const db = await useLedge()

        await db.execute('DELETE from Ledges WHERE id = $1', [id])

        const data = await db.select('SELECT * from Ledges')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
