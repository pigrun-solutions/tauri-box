import { Vent } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type VentsProp = {
    id?: string
    diameterInch: number
    wtLbs: number
    labHours: number
    matCost: number
}

export default async function useVents() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Vents`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Vents (
            id INTEGER PRIMARY KEY autoincrement, 
            diameterInch REAL DEFAULT 0.00,
            wtLbs REAL DEFAULT 0.00,
            labHours REAL DEFAULT 0.00,
            matCost REAL DEFAULT 0.00,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    return db
}

export const getAllVents = async () => {
    try {
        const db = await useVents()

        const data = (await db.select('SELECT * FROM Vents')) as Vent[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

export const getVent = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useVents()

            const data = (await db.select('SELECT * from Vent WHERE id = $1', [id])) as Vent[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditVent = async (data: VentsProp) => {
    try {
        const db = await useVents()

        if (data.id)
            await db.execute(`UPDATE Vents SET diameterInch = $1, wtLbs = $2, labHours = $3, matCost = $4, updatedAt = CURRENT_TIMESTAMP WHERE id = $5`, [
                data.diameterInch,
                data.wtLbs,
                data.labHours,
                data.matCost,
                data.id,
            ])
        else await db.execute(`INSERT INTO Vents (diameterInch, wtLbs, labHours, matCost) VALUES ($1, $2, $3, $4)`, [data.diameterInch, data.wtLbs, data.labHours, data.matCost])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteVent = async (id: string) => {
    try {
        const db = await useVents()

        await db.execute('DELETE FROM Vents WHERE id = $1', [id])

        const data = await db.select('SELECT * FROM Vents')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
