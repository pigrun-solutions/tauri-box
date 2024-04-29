import { Bolt, BookCopy, Circle, Fan, Forklift, GlassWater, Glasses, GripHorizontal, Home, Milk, Package, Pentagon, Printer, Syringe, Users2 } from 'lucide-react'

const NavigationItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        disabled: false,
        icon: <Home className="h-5 w-5" />,
    },

    {
        label: 'Additives',
        href: '/dashboard/additives',
        disabled: false,
        icon: <Package className="h-5 w-5" />,
    },
    {
        label: 'Other',
        href: '/dashboard/other',
        disabled: true,
        icon: <GripHorizontal className="h-5 w-5" />,
    },

    {
        label: 'Bolts',
        href: '/dashboard/bolts',
        disabled: false,
        icon: <Bolt className="h-5 w-5" />,
    },
    {
        label: 'Resin',
        href: '/dashboard/resins',
        disabled: false,
        icon: <Milk className="h-5 w-5" />,
    },

    {
        label: 'Customers',
        href: '/dashboard/customers',
        disabled: false,
        icon: <Users2 className="h-5 w-5" />,
    },
    {
        label: 'Sight Glasses',
        href: '/dashboard/sightglasses',
        disabled: false,
        icon: <Glasses className="h-5 w-5" />,
    },

    {
        label: 'Glasses',
        href: '/dashboard/glasses',
        disabled: false,
        icon: <GlassWater className="h-5 w-5" />,
    },
    {
        label: 'Vents',
        href: '/dashboard/vents',
        disabled: false,
        icon: <Fan className="h-5 w-5" />,
    },

    {
        label: 'Laminates',
        href: '/dashboard/laminates',
        disabled: true,
        icon: <Printer className="h-5 w-5" />,
    },
    {
        label: 'Gaskets',
        href: '/dashboard/gaskets',
        disabled: false,
        icon: <Pentagon className="h-5 w-5" />,
    },

    {
        label: 'Manways',
        href: '/dashboard/manways',
        disabled: false,
        icon: <Circle className="h-5 w-5" />,
    },
    {
        label: 'Lift Lugs',
        href: '/dashboard/liftlugs',
        disabled: false,
        icon: <Forklift className="h-5 w-5" />,
    },

    {
        label: 'Nozzles',
        href: '/dashboard/nozzles',
        disabled: false,
        icon: <Syringe className="h-5 w-5" />,
    },
    {
        label: 'Ledges',
        href: '/dashboard/ledges',
        disabled: false,
        icon: <BookCopy className="h-5 w-5" />,
    },
]

export default NavigationItems
