import { Customer } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type AdditiveProps = {
    id?: string
    name: string
    email?: string
    phone: string
    fax?: string
    contact?: string
    address?: string
}

export default async function useAdditive() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Customers`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Customers (
                id VARCHAR(191) PRIMARY KEY DEFAULT (UUID()),
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(255) NOT NULL,
                fax VARCHAR(255),
                contact VARCHAR(255),
                address VARCHAR(255),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
              )`
    )

    return db
}

export const getAllCustomers = async () => {
    try {
        const db = await useAdditive()

        const data = (await db.select('SELECT * FROM Customers')) as Customer[]

        return { success: true, data }
    } catch (error) {
        console.error(error)
        return { success: false, error }
    }
}

export const getCustomer = async (id: string) => {
    try {
        if (id !== 'add') {
            const db = await useAdditive()

            const data = (await db.select('SELECT * from Customers WHERE id = $1', [id])) as Customer[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

export const createEditCustomer = async (data: AdditiveProps) => {
    try {
        const db = await useAdditive()

        const { name, email, phone, fax, contact, address, id } = data

        if (id) {
            const exists = await db.select('SELECT * from Customers WHERE id = $1', [id])
            if (exists) await db.execute('UPDATE Customers SET name = $1, email = $2, phone = $3, fax = $4, contact = $5, address = $6 WHERE id = $7', [name, email, phone, fax, contact, address, id])
        } else await db.execute('INSERT into Customers (name, email, phone, fax, contact, address) VALUES ($1, $2, $3, $4, $5, $6)', [name, email, phone, fax, contact, address])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteCustomer = async (id: string) => {
    try {
        const db = await useAdditive()

        await db.execute('DELETE from Customers WHERE id = $1', [id])

        const data = await db.select('SELECT * from Customers')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
