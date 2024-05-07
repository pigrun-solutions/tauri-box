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
    contactPhone?: string
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

// * ================================= Laminate =================================
export type Laminate = Bolt
export type LaminateDetails = {
    id: string

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

    createdAt: string
    updatedAt: string
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2 pager ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Complicated ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export type Other = {
    id: string
    labourRate: number
    wastage: number
    nameplate: number
    pattern: number
    usage: number

    ladderClipsCost: number
    ladderClipsLbs: number
    ladderClipsHrs: number

    manwayHingesCost: number
    manwayHingesLbs: number
    manwayHingesHrs: number

    manwayDavitsCost: number
    manwayDavitsLbs: number
    manwayDavitsHrs: number

    layupRateSqFt: number

    balsaThickness1: number
    balsaThickness2: number
    balsaThickness3: number
    balsaThickness4: number
    balsaThickness5: number

    balsaCost1: number
    balsaCost2: number
    balsaCost3: number
    balsaCost4: number
    balsaCost5: number

    createdAt: string
    updatedAt: string
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Complicated ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ? Step 1
export type OrderDesign = {
    date?: string
    reference?: string
    rfq?: string
    customerName?: string
    customerAddress1?: string
    customerAddress2?: string
    customerAddress3?: string
    customerPhone?: string
    customerFax?: string
    customerContact?: string
    customerContactPhone?: string
    dwgName?: string
    dwgNo?: string
}

// ? Step 2
export type OrderTankData = {
    resinId?: number
    corrLinear: string // ? ["yes", "no", "buckling only"]

    shellInternalDiam: number
    shellLength: number
    shellJoint1?: number
    shellJoint2?: number
    shellJoint3?: number
    shellJoint4?: number
    shellJoint5?: number
    shellJoint6?: number
    shellLaminateId?: number
    shellLaminateMinThk: number

    headType: string // ? ["Conical", "Torispherical", "Elliptical", "Hemispherical", "Flat", "Special"]
    headHeight: number
    headLaminateId?: number
    headLaminateMinThk: number

    saddleHeight: number
    saddleWidth: number
    saddleLaminateId?: number
    saddleLaminateMinThk: number

    bodyFlange: string // ? ["yes", "no"]
    bodyFlangeLocation1?: number
    bodyFlangeLocation2?: number
    bodyFlangeLocation3?: number
    bodyFlangeLocation4?: number
    bodyFlangeLocation5?: number
    bodyFlangeLocation6?: number

    liquidDensity: number
    pressure: number

    vacuum: number
    vacuumBuckle: number

    snowLoad: number
    wind: number

    seismic: string // ? ["0", "1", "2A", "2B", "3", "4", "Special"]
}

// ? Step 3
export type OrderNozzle = {
    drawingRef?: string
    size: number
    press: number
    loc: number
    orient: number
    nozId?: string
    boltId?: string
    gasketId?: string
    blind?: string
}

// ? Step 4
export type ManwayTable = {
    drawingRef?: string
    manwayId: string
    size: number // ? [20.0, 24.0, 30.0, 36.0]
    loc: number
    orient: number
    boltId?: string
    gasketId?: string
    hinge: string // ? ['hinge', 'davit', 'none']
}

// ? Step 5
export type AdditionalCosts = {
    liftLugs: number
    markup: number
    design: number
    postcure: number
    // additives?: string
    nameplate: number
    ladderClips: number
    ventDiameter: number

    // ? Testing
    hydro: number
    ae: number
    vacuum: number
    cutouts: number

    // ? Shipping
    freight: number
    handling: number
    cradles: number
    escort: number

    // ? Pattern
    new: boolean
    tankNum: number
    head: number
    shell: number
    other: number
}

// ? Step 6
export type OtherCostItems = {
    description: string
    itemCost?: number
    matCost?: number
    wtLbs?: number
    labHours?: number
}

export type OtherCostNotes = { note: string }
export type Step6Type = {
    otherCostItems: OtherCostItems[]
    otherCostNotes: OtherCostNotes[]
}
