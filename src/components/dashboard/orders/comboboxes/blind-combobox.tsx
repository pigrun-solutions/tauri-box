import * as React from 'react'
import { cn } from '@/lib/utils'
import { SightGlasses } from '@/types/types'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

export function BlindCombobox({ sightGlasses, selected, onItemSelected }: { sightGlasses: SightGlasses[]; selected: string | undefined; onItemSelected: (id: string) => void }) {
    const [open, setOpen] = React.useState(false)

    const onSelect = async (glassesId: string) => {
        onItemSelected(glassesId)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                    {selected ? (selected === 'blind' ? 'Blind' : selected === 'none' ? 'None' : sightGlasses.find(glasses => glasses.id === selected)?.name) : 'Select Autofill...'}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Customers..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Customer found.</CommandEmpty>

                        <ScrollArea className={cn(sightGlasses.length > 1 ? 'h-28' : 'h-fit')}>
                            <CommandGroup>
                                <CommandItem value="none" onSelect={() => onSelect('none')}>
                                    None
                                    <CheckIcon className={cn('ml-auto h-4 w-4', selected === 'none' ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                                <CommandItem value="blind" onSelect={() => onSelect('blind')}>
                                    Blind
                                    <CheckIcon className={cn('ml-auto h-4 w-4', selected === 'blind' ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>

                                {sightGlasses.map(glasses => (
                                    <CommandItem key={glasses.id} value={glasses.id} onSelect={() => onSelect(glasses.id)}>
                                        {glasses.name}
                                        <CheckIcon className={cn('ml-auto h-4 w-4', selected === glasses.id ? 'opacity-100' : 'opacity-0')} />
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
