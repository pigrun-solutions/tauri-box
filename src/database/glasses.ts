import { Glass } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type GlassesProps = {
    id?: string
    name: string
    costKg: number
    costLbs: number
}

export default async function useGlasses() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Glasses`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Glasses (
            id INTEGER PRIMARY KEY autoincrement, 
            name VARCHAR(255) NOT NULL,
            costKg REAL DEFAULT 0.00,
            costLbs REAL DEFAULT 0.00,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db
}

export const getAllGlasses = async () => {
    try {
        const db = await useGlasses()

        const data = (await db.select('SELECT * FROM Glasses')) as Glass[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getGlass = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useGlasses()

            const data = (await db.select('SELECT * from Glasses WHERE id = $1', [id])) as Glass[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditGlass = async (data: GlassesProps) => {
    try {
        const db = await useGlasses()

        if (data.id) {
            await db.execute(`UPDATE Glasses SET name = $1, costKg = $2, costLbs = $3, updatedAt = CURRENT_TIMESTAMP WHERE id = $4`, [data.name, data.costKg, data.costLbs, data.id])
        } else {
            await db.execute(`INSERT INTO Glasses (name, costKg, costLbs) VALUES ($1, $2, $3)`, [data.name, data.costKg, data.costLbs])
        }

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteGlass = async (id: string) => {
    try {
        const db = await useGlasses()

        await db.execute('DELETE from Glasses WHERE id = $1', [id])

        const data = await db.select('SELECT * from Glasses')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
