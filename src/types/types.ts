// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1 pager ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export type Additive = {
    id: string
    name: string
    costKg: number
    costLbs: number
    densityGmCc: number
    createdAt: string
    updatedAt: string
}
export type Resin = Additive

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
    costLbs: number
    createdAt: string
    updatedAt: string
}

export type Vent = {
    id: string
    diameterInch: number
    wtLbs: number
    labHours: number
    matCost: number
    createdAt: string
    updatedAt: string
}

export type LiftLug = {
    id: string
    capacityLbs: number
    wtLbs: number
    labHours: number
    createdAt: string
    updatedAt: string
}

export type Ledge = {
    id: string
    type: string
    wtLbs: number
    layupRateLbs: number
    createdAt: string
    updatedAt: string
}
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1 pager ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2 pager ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export type Bolt = {
    id: string
    name: string
    BoltVariants: BoltVariants[]
    createdAt: string
    updatedAt: string
}
export type BoltVariants = {
    id: string
    boltId: string
    diameterInch: number
    lengthInch: number
    boltCost: number
    nutCost: number
    washerCost: number
    createdAt: string
    updatedAt: string
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2 pager ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
