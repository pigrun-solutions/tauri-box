import { Bolt, BookCopy, Circle, Fan, Forklift, GlassWater, Glasses, Home, Milk, Package, Pentagon, Users2 } from 'lucide-react'

const NavigationItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <Home className="h-5 w-5" />,
    },
    {
        label: 'Additives',
        href: '/dashboard/additives',
        icon: <Package className="h-5 w-5" />,
    },
    {
        label: 'Glasses',
        href: '/dashboard/glasses',
        icon: <GlassWater className="h-5 w-5" />,
    },
    {
        label: 'Resin',
        href: '/dashboard/resins',
        icon: <Milk className="h-5 w-5" />,
    },
    {
        label: 'Vents',
        href: '/dashboard/vents',
        icon: <Fan className="h-5 w-5" />,
    },
    {
        label: 'Lift Lugs',
        href: '/dashboard/liftlugs',
        icon: <Forklift className="h-5 w-5" />,
    },
    {
        label: 'Ledges',
        href: '/dashboard/ledges',
        icon: <BookCopy className="h-5 w-5" />,
    },
    {
        label: 'Bolts',
        href: '/dashboard/bolts',
        icon: <Bolt className="h-5 w-5" />,
    },
    {
        label: 'Sight Glasses',
        href: '/dashboard/sightglasses',
        icon: <Glasses className="h-5 w-5" />,
    },
    {
        label: 'Gaskets',
        href: '/dashboard/gaskets',
        icon: <Pentagon className="h-5 w-5" />,
    },
    {
        label: 'Manways',
        href: '/dashboard/manways',
        icon: <Circle className="h-5 w-5" />,
    },
    {
        label: 'Customers',
        href: '/dashboard/customers',
        icon: <Users2 className="h-5 w-5" />,
    },
]

export default NavigationItems
