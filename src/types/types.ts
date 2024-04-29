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
    phone: string
    fax?: string
    contact?: string
    address1?: string
    address2?: string
    address3?: string
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

// * ================================= Bolts =================================
export type Bolt = {
    id: string
    name: string
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

// * ================================= Sight Glasses =================================
export type SightGlasses = Bolt
export type SightGlassVariants = {
    id: string
    sightGlassId: string
    diameterInch: number
    cost: number
    createdAt: string
    updatedAt: string
}

// * ================================= Gaskets =================================
export type Gasket = Bolt
export type GasketVariants = {
    id: string
    gasketId: string
    diameterInch: number
    cost: number
    createdAt: string
    updatedAt: string
}

// * ================================= Manway =================================
export type Manway = Bolt
export type ManwayVariants = {
    id: string
    manwayId: string
    sizeInch: number
    cost: number
    nozWtLbs: number
    weldWtLbs: number
    labHours: number
    diameter: number
    boltsNum: number
    length: number
    createdAt: string
    updatedAt: string
}

// *  ================================= Nozzle =================================
export type Nozzle = Bolt
export type NozzleVariants = {
    id: string
    nozzleId: string
    variantId: number
    od: number
    bc: number
    boltsNum: number
    diameter: number
    flgT: number
    cost: number
    blindCost: number
    nozWtLbs: number
    welWtLbs: number
    labHours: number
    createdAt: string
    updatedAt: string
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2 pager ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
