import { Laminate } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type LaminateProps = {
    id?: string
    name: string
}

export default async function useLaminate() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Laminates`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Laminates (
            id INTEGER PRIMARY KEY autoincrement,
            name VARCHAR(255) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db
}

// ? GET
export const getAllLaminates = async () => {
    try {
        const db = await useLaminate()

        const data = (await db.select('SELECT * FROM Laminates')) as Laminate[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getLaminate = async (id: string) => {
    try {
        const db = await useLaminate()

        const data = (await db.select('SELECT * FROM Laminates WHERE id = $1', [id])) as Laminate[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PUT
export const createEditLaminate = async (props: LaminateProps) => {
    try {
        const db = await useLaminate()

        if (props.id) await db.execute(`UPDATE Laminates SET name = $1, updatedAt = CURRENT_TIMESTAMP WHERE id = $2`, [props.name, props.id])
        else await db.execute(`INSERT INTO Laminates (name) VALUES ($1)`, [props.name])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteLaminate = async (id: string) => {
    try {
        const db = await useLaminate()

        await db.execute('DELETE FROM Laminates WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM Laminates')) as Laminate[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
