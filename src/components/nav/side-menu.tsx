import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/use-auth'
import { LogOut, Menu } from 'lucide-react'
import NavigationItems from '@/context/navigation'
import { Link, useNavigate } from '@tanstack/react-router'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const MenuItem = ({ icon, label, href, expanded }: { icon: React.ReactNode; href: string; label: string; expanded: boolean }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    to={href}
                    className={cn('flex h-9 items-center justify-center gap-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8', !expanded ? 'w-9 md:w-8' : 'w-fit')}>
                    {icon}
                    <span className={cn(!expanded ? 'sr-only' : 'text-sm font-medium animate-in fade-in zoom-in')}>{label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    )
}

const SideMenu = () => {
    const navigate = useNavigate()
    const { signOut } = useAuth()
    const [expanded, setExpanded] = useState(false)

    const handleLogout = async () => {
        await signOut()
        navigate({ to: '/' })
    }

    return (
        <aside className={cn('inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all sm:flex', !expanded ? 'w-14' : 'w-52')}>
            <nav className={cn('flex flex-col gap-4 px-2 py-4')}>
                <Button
                    onClick={() => setExpanded(prev => !prev)}
                    size="icon"
                    variant="default"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full md:h-8 md:w-8 md:text-base">
                    <Menu className="size-4 text-primary-foreground transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Button>

                <TooltipProvider delayDuration={0}>
                    {NavigationItems.map((item, index) => (
                        <MenuItem key={index} icon={item.icon} label={item.label} href={item.href} expanded={expanded} />
                    ))}
                </TooltipProvider>
            </nav>

            <nav className="mt-auto flex flex-col gap-4 px-2 py-4">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleLogout}
                                className={cn(
                                    'flex h-9 items-center justify-center gap-2 rounded-lg text-muted-foreground transition-colors hover:bg-transparent hover:text-destructive md:h-8',
                                    !expanded ? 'w-9 md:w-8' : 'w-fit'
                                )}>
                                <LogOut className="h-5 w-5" />
                                <span className={cn(!expanded ? 'sr-only' : 'animate-in fade-in zoom-in')}>Logout</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-destructive" side="right">
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}

export default SideMenu
