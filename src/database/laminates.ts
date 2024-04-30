import { Laminate, LaminateDetails } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type LaminateProps = {
    id?: string
    name: string
}
type LaminateDetailsProps = {
    id?: string
    atsLinear: number
    atsNonLinear: number
    afsLinear: number
    afsNonLinear: number
    atmLinear: number
    atmNonLinear: number
    afmLinear: number
    afmNonLinear: number
    htsLinear: number
    htsNonLinear: number
    hfsLinear: number
    hfsNonLinear: number
    htmLinear: number
    htmNonLinear: number
    hfmLinear: number
    hfmNonLinear: number
    issLinear: number
    issNonLinear: number
    mtLinear: number
    mtNonLinear: number
    layupRate: number
    clrName1: string
    clrName2: string
    clrOz1: number
    clrOz2: number
    swrName1: string
    swrName2: string
    swrName3: string
    swrName4: string
    swrOz1: number
    swrOz2: number
    swrOz3: number
    swrOz4: number
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
    await db.execute(
        `CREATE TABLE IF NOT EXISTS LaminateDetails (
            id INTEGER PRIMARY KEY autoincrement,
            laminateId INTEGER NOT NULL,
            
            atsLinear INTEGER DEFAULT 100,
            atsNonLinear INTEGER DEFAULT 100,
            afsLinear INTEGER DEFAULT 100,
            afsNonLinear INTEGER DEFAULT 100,
            atmLinear INTEGER DEFAULT 1000,
            atmNonLinear INTEGER DEFAULT 1000,
            afmLinear INTEGER DEFAULT 1000,
            afmNonLinear INTEGER DEFAULT 1000,

            htsLinear INTEGER DEFAULT 100,
            htsNonLinear INTEGER DEFAULT 100,
            hfsLinear INTEGER DEFAULT 100,
            hfsNonLinear INTEGER DEFAULT 100,
            htmLinear INTEGER DEFAULT 1000,
            htmNonLinear INTEGER DEFAULT 1000,
            hfmLinear INTEGER DEFAULT 1000,
            hfmNonLinear INTEGER DEFAULT 1000,

            issLinear INTEGER DEFAULT 30,
            issNonLinear INTEGER DEFAULT 30,

            mtLinear REAL DEFAULT 0.00,
            mtNonLinear REAL DEFAULT 0.00,

            layupRate REAL DEFAULT 1.00,

            clrName1 VARCHAR(255),
            clrName2 VARCHAR(255),
            clrOz1 REAL,
            clrOz2 REAL,

            swrName1 VARCHAR(255),
            swrName2 VARCHAR(255),
            swrName3 VARCHAR(255),
            swrName4 VARCHAR(255),
            swrOz1 REAL,
            swrOz2 REAL,
            swrOz3 REAL,
            swrOz4 REAL,

            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (laminateId) REFERENCES Laminates(id)
        )`
    )

    return db
}

// ? GET
export const getAllLaminates = async () => {
    try {
        const db = await useLaminate()

        const data = (await db.select('SELECT * FROM Laminates')) as Laminate[]
        const data2 = (await db.select('SELECT * FROM LaminateDetails')) as LaminateDetails[]

        return { success: true, data, data2 }
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
export const getLaminateDetails = async (id: string) => {
    try {
        const db = await useLaminate()

        const data = (await db.select('SELECT * FROM LaminateDetails WHERE laminateId = $1', [id])) as LaminateDetails[]

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
        else {
            const laminate = await db.execute(`INSERT INTO Laminates (name) VALUES ($1)`, [props.name])
            const check = laminate.lastInsertId > 0
            if (check) await db.execute(`INSERT INTO LaminateDetails (laminateId) VALUES ($1)`, [laminate.lastInsertId])
        }

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditLaminateDetails = async (props: LaminateDetailsProps, laminateId: string) => {
    try {
        const db = await useLaminate()

        const data = (await db.select('SELECT * FROM LaminateDetails WHERE laminateId = $1', [laminateId])) as Laminate[]

        if (data.length > 0) {
            await db.execute(
                `UPDATE LaminateDetails SET
                    atsLinear = $1, atsNonLinear = $2, afsLinear = $3, afsNonLinear = $4, atmLinear = $5, atmNonLinear = $6, afmLinear = $7, afmNonLinear = $8,
                    htsLinear = $9, htsNonLinear = $10, hfsLinear = $11, hfsNonLinear = $12, htmLinear = $13, htmNonLinear = $14, hfmLinear = $15, hfmNonLinear = $16,
                    issLinear = $17, issNonLinear = $18, mtLinear = $19, mtNonLinear = $20, layupRate = $21,
                    clrName1 = $22, clrName2 = $23, clrOz1 = $24, clrOz2 = $25,
                    swrName1 = $26, swrName2 = $27, swrName3 = $28, swrName4 = $29, swrOz1 = $30, swrOz2 = $31, swrOz3 = $32, swrOz4 = $33,
                    updatedAt = CURRENT_TIMESTAMP
                WHERE laminateId = $34`,
                [
                    props.atsLinear,
                    props.atsNonLinear,
                    props.afsLinear,
                    props.afsNonLinear,
                    props.atmLinear,
                    props.atmNonLinear,
                    props.afmLinear,
                    props.afmNonLinear,
                    props.htsLinear,
                    props.htsNonLinear,
                    props.hfsLinear,
                    props.hfsNonLinear,
                    props.htmLinear,
                    props.htmNonLinear,
                    props.hfmLinear,
                    props.hfmNonLinear,
                    props.issLinear,
                    props.issNonLinear,
                    props.mtLinear,
                    props.mtNonLinear,
                    props.layupRate,
                    props.clrName1,
                    props.clrName2,
                    props.clrOz1,
                    props.clrOz2,
                    props.swrName1,
                    props.swrName2,
                    props.swrName3,
                    props.swrName4,
                    props.swrOz1,
                    props.swrOz2,
                    props.swrOz3,
                    props.swrOz4,
                    laminateId,
                ]
            )
        }

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteLaminate = async (id: string) => {
    try {
        const db = await useLaminate()

        await db.execute('DELETE FROM LaminateDetails WHERE laminateId = $1', [id])
        await db.execute('DELETE FROM Laminates WHERE id = $1', [id])

        const data = (await db.select('SELECT * FROM Laminates')) as Laminate[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
