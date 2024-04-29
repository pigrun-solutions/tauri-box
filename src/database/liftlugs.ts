import { LiftLug } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type LiftLugProps = {
    id?: string
    capacityLbs: number
    wtLbs: number
    labHours: number
}

export default async function useLiftLug() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE LiftLugs`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS LiftLugs (
            id INTEGER PRIMARY KEY autoincrement, 
            capacityLbs INTEGER DEFAULT 0,
            wtLbs REAL DEFAULT 0.00,
            labHours REAL DEFAULT 0.00,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db
}

export const getAllLiftLugs = async () => {
    try {
        const db = await useLiftLug()

        const data = (await db.select('SELECT * FROM LiftLugs')) as LiftLug[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getLiftLug = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useLiftLug()

            const data = (await db.select('SELECT * from LiftLugs WHERE id = $1', [id])) as LiftLug[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditLiftLug = async (data: LiftLugProps) => {
    try {
        const db = await useLiftLug()

        const { id, capacityLbs, wtLbs, labHours } = data

        if (id) {
            const exists = await db.select('SELECT * from LiftLugs WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE LiftLugs SET capacityLbs = $1, wtLbs = $2, labHours= $3 WHERE id = $4', [capacityLbs, wtLbs, labHours, id])
        } else await db.execute('INSERT into LiftLugs (capacityLbs, wtLbs, labHours) VALUES ($1, $2, $3)', [capacityLbs, wtLbs, labHours])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteLiftLug = async (id: string) => {
    try {
        const db = await useLiftLug()

        await db.execute('DELETE from LiftLugs WHERE id = $1', [id])

        const data = await db.select('SELECT * from LiftLugs')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
