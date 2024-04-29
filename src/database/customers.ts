import { Customer } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type CustomerNameProps = {
    id?: string
    name: string
}
type CustomerDetailsProps = {
    id?: string
    address1?: string
    address2?: string
    address3?: string
    phone?: string
    fax?: string
    contact?: string
}

export default async function useCustomer() {
    const db = await Database.load('sqlite:test.db')

    // await db.execute(`DROP TABLE Customers`)
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Customers (
                id INTEGER PRIMARY KEY autoincrement,
                name VARCHAR(255) NOT NULL,
                address1 VARCHAR(255),
                address2 VARCHAR(255),
                address3 VARCHAR(255),
                phone VARCHAR(255),
                fax VARCHAR(255),
                contact VARCHAR(255),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
              )`
    )

    return db
}

// ? GET
export const getAllCustomers = async () => {
    try {
        const db = await useCustomer()

        const data = (await db.select('SELECT * FROM Customers')) as Customer[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
export const getCustomer = async (id: string) => {
    try {
        const db = await useCustomer()

        const data = (await db.select('SELECT * FROM Customers WHERE id = $1', [id])) as Customer[]

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PUT
export const createEditCustomerName = async (data: CustomerNameProps) => {
    try {
        const db = await useCustomer()

        const { name, id } = data

        if (!id) await db.execute('INSERT INTO Customers (name) VALUES ($1)', [name])
        else await db.execute('UPDATE Customers SET name = $1 WHERE id = $2', [name, id])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditCustomerDetails = async (data: CustomerDetailsProps) => {
    try {
        const db = await useCustomer()

        const { id, address1, address2, address3, phone, fax, contact } = data

        await db.execute(`UPDATE Customers SET address1 = $1, address2 = $2, address3 = $3, phone = $4, fax = $5, contact = $6 WHERE id = $7`, [address1, address2, address3, phone, fax, contact, id])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

// ? DELETE
export const deleteCustomer = async (id: string) => {
    try {
        const db = await useCustomer()

        await db.execute('DELETE from Customers WHERE id = $1', [id])

        const data = await db.select('SELECT * from Customers')

        return { success: true, data }
    } catch (error) {
        return { success: false, error }
    }
}
