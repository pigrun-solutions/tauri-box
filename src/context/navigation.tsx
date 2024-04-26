import { GlassWater, Home, Milk, Package, Users2 } from 'lucide-react'

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
        label: 'Customers',
        href: '/dashboard/customers',
        icon: <Users2 className="h-5 w-5" />,
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
        label: 'Products',
        href: '/dashboard/products',
        icon: <Package className="h-5 w-5" />,
    },
]

export default NavigationItems
