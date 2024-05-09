import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCustomersStore } from '@/zustand/customers-store'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

export function CustomerCombobox({ form }: { form: any }) {
    const { customers } = useCustomersStore()
    const [open, setOpen] = React.useState(false)
    const [value, _setValue] = React.useState('')

    const onSelect = async (customerId: string) => {
        // ? get customer object from customers, search by id
        const customer = customers.find(customer => customer.id === customerId)

        // ? set form values to ''
        await form.setValue('customerName', '')
        await form.setValue('customerAddress1', '')
        await form.setValue('customerAddress2', '')
        await form.setValue('customerAddress3', '')
        await form.setValue('customerPhone', '')
        await form.setValue('customerFax', '')
        await form.setValue('customerContact', '')
        await form.setValue('customerContactPhone', '')

        form.setValue('customerName', customer?.name || '')
        form.setValue('customerAddress1', customer?.address1 || '')
        form.setValue('customerAddress2', customer?.address2 || '')
        form.setValue('customerAddress3', customer?.address3 || '')
        form.setValue('customerPhone', customer?.phone || '')
        form.setValue('customerFax', customer?.fax || '')
        form.setValue('customerContact', customer?.contact || '')
        form.setValue('customerContactPhone', customer?.contactPhone || '')

        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value ? customers.find(customer => customer.name === value)?.name : 'Select Autofill...'}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Customers..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Customer found.</CommandEmpty>

                        <ScrollArea className={cn(customers.length > 3 ? 'h-28' : 'h-fit')}>
                            <CommandGroup>
                                {customers.map(customer => (
                                    <CommandItem key={customer.id} value={customer.id} onSelect={() => onSelect(customer.id)}>
                                        {customer.name}
                                        <CheckIcon className={cn('ml-auto h-4 w-4', value === customer.name ? 'opacity-100' : 'opacity-0')} />
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
