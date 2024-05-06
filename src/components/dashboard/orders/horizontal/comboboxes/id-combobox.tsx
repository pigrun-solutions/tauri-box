import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Laminate, Resin } from '@/types/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

export function IdCombobox({
    items,
    selected,
    className,
    onItemSelected,
}: {
    className?: string
    items: Laminate[] | Resin[]
    selected: number | undefined
    onItemSelected: (id: string | '') => void
}) {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (currentValue: string) => {
        const item = items.find(item => item.name === currentValue)
        onItemSelected(item?.id || '')
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className={cn('justify-between', className)}>
                    {selected ? items.find(item => Number(item.id) === selected)?.name : 'Select item...'}
                    <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search items..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>

                        <ScrollArea className={cn(items.length > 3 ? 'h-28' : 'h-fit')}>
                            <CommandGroup>
                                {items.map(item => (
                                    <CommandItem key={item.id} value={item.id} onSelect={currentValue => handleSelect(currentValue)}>
                                        {item.name}
                                        <CheckIcon className={cn('ml-auto h-4 w-4', selected === Number(item.id) ? 'opacity-100' : 'opacity-0')} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
