import { Customer } from '@/types/types'
import Database from 'tauri-plugin-sql-api'

type CustomerNameProps = {
    id: string
    name: string
}
type CustomerDetailsProps = {
    id?: string
    email?: string
    phone: string
    fax?: string
    contact?: string
    address?: string
}

export default async function useCustomer() {
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

// ? GET
export const getAllCustomers = async () => {
    try {
        const db = await useCustomer()

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
            const db = await useCustomer()

            const data = (await db.select('SELECT * from Customers WHERE id = $1', [id])) as Customer[]
            const result = data[0]

            return { success: true, data: result }
        }
        return { success: true, data: undefined }
    } catch (error) {
        return { success: false, error }
    }
}

// ? POST, PUT
export const updateCustomerName = async (data: CustomerNameProps) => {
    try {
        const db = await useCustomer()

        const { name, id } = data

        await db.execute('UPDATE Customers SET name = $1 WHERE id = $2', [name, id])

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}
export const createEditCustomerDetails = async (data: CustomerDetailsProps) => {
    try {
        const db = await useCustomer()

        const { email, phone, fax, contact, address, id } = data

        await db.execute('UPDATE Customers SET email = $1, phone = $2, fax = $3, contact = $4, address = $5 WHERE id = $6', [email, phone, fax, contact, address, id])

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
