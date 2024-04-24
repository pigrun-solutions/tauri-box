import { Home, LineChart, Package, ShoppingCart, Users2 } from 'lucide-react'

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
        label: 'Orders',
        href: '/dashboard/orders',
        icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
        label: 'Products',
        href: '/dashboard/products',
        icon: <Package className="h-5 w-5" />,
    },
    {
        label: 'Customers',
        href: '/dashboard/customers',
        icon: <Users2 className="h-5 w-5" />,
    },
    {
        label: 'Analytics',
        href: '/dashboard/analytics',
        icon: <LineChart className="h-5 w-5" />,
    },
]

export default NavigationItems
