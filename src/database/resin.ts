import { Resin } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type ResinProps = {
    id?: string
    name: string
    costKg: number
    costLbs: number
    densityGmCc: number
}

export default async function useResin() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Resins`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Resins (
            id INTEGER PRIMARY KEY autoincrement, 
            name VARCHAR(255) NOT NULL,
            costKg REAL DEFAULT 0.00, 
            costLbs REAL DEFAULT 0.00,
            densityGmCc REAL DEFAULT 1.00, 
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db
}

export const getAllResins = async () => {
    try {
        const db = await useResin()

        const data = (await db.select('SELECT * FROM Resins')) as Resin[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getResin = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useResin()

            const data = (await db.select('SELECT * from Resins WHERE id = $1', [id])) as Resin[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditResin = async (data: ResinProps) => {
    try {
        const db = await useResin()

        if (data.id)
            await db.execute(`UPDATE Resins SET name = $1, costKg = $2, costLbs=$3, densityGmCc = $4, updatedAt = CURRENT_TIMESTAMP WHERE id = $5`, [
                data.name,
                data.costKg,
                data.costLbs,
                data.densityGmCc,
                data.id,
            ])
        else await db.execute(`INSERT INTO Resins (name, costKg, costLbs, densityGmCc) VALUES ($1, $2, $3, $4)`, [data.name, data.costKg, data.costLbs, data.densityGmCc])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteResin = async (id: string) => {
    try {
        const db = await useResin()

        await db.execute('DELETE FROM Resins WHERE id = $1', [id])

        const data = await db.select('SELECT * FROM Resins')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
