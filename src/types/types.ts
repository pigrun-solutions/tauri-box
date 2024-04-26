export type Additive = {
    id: string
    name: string
    costKg: number
    densityGmCc: number
    createdAt: string
    updatedAt: string
}

export type Customer = {
    id: string
    name: string
    email?: string
    phone: string
    fax?: string
    contact?: string
    address?: string
    createdAt: string
    updatedAt: string
}

export type Glass = {
    id: string
    name: string
    costKg: number
    createdAt: string
    updatedAt: string
}

export type Resin = {
    id: string
    name: string
    costKg: number
    densityGmCc: number
    createdAt: string
    updatedAt: string
}
