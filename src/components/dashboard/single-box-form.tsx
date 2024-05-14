import { toast } from 'sonner'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { SingleBox } from '@/types/types'
import { Input } from '@/components/ui/input'
import FormHeader from '@/components/ui/form-header'
// import { useNavigate } from '@tanstack/react-router'
import { useSocketStore } from '@/zustand/socket-store'
import { Card, CardContent } from '@/components/ui/card'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { useSettingsStore } from '@/zustand/settings-store'

const SingleBoxForm = () => {
    // const navigate = useNavigate()
    const { socket } = useSocketStore()
    const { settings } = useSettingsStore()
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<SingleBox>({ deviceType: '', uid: 0 })

    const onSubmit = async (submitType: 'checkin' | 'packet') => {
        try {
            setLoading(true)

            if (submitType === 'checkin') {
                const latBytes: Uint8Array = new Uint8Array(new Int32Array([settings.lat]).buffer)
                const lonBytes: Uint8Array = new Uint8Array(new Int32Array([settings.long]).buffer)
                console.log('latBytes:', latBytes)

                const BufferSize: number = 100
                const SYNCH: number[] = [0x21, 0x7e]

                // Define other values
                let length: number = 0 // Placeholder for length
                const packetId: number = 0x60 // Packet ID
                const packetType: number = 0x02 // Packet Type
                const ackType: number = 0x01 // Acknowledgment Type

                // Create a typed array with Uint8Array
                const buffer = new Uint8Array(BufferSize) // Allocate buffer of BufferSize bytes

                // Write values to the buffer
                buffer.set(new Uint8Array(SYNCH), 0) // Write SYNCH values at offset 0
                buffer[2] = length & 0xff // Write length LSB at offset 3
                buffer[3] = packetId // Write packetId at offset 4
                buffer[4] = packetType // Write packetType at offset 5
                buffer[5] = ackType // Write ackType at offset 6

                buffer[6] += (formData.uid >> 24) & 0xff // Add to byte at offset 8
                buffer[7] += (formData.uid >> 16) & 0xff // Add to byte at offset 9
                buffer[8] += (formData.uid >> 8) & 0xff // Add to byte at offset 10
                buffer[9] += formData.uid & 0xff // Add to byte at offset 11

                // Add UID of 200 to the correct byte positions for Lat
                buffer[10] += latBytes[1] // Add to byte at offset 12
                buffer[11] += latBytes[2] // Add to byte at offset 13
                buffer[12] += latBytes[3] // Add to byte at offset 14
                buffer[13] += latBytes[4] // Add to byte at offset 15

                // Add UID of 300 to the correct byte positions for Lon
                buffer[14] += lonBytes[1] // Add to byte at offset 16
                buffer[15] += lonBytes[2] // Add to byte at offset 17
                buffer[16] += lonBytes[3] // Add to byte at offset 18
                buffer[17] += lonBytes[4] // Add to byte at offset 19

                socket?.emit('rawBytes', buffer)
            }
        } catch (error) {
            console.log(error)
            toast.error(error as string)
        } finally {
            setLoading(false)
        }
    }

    // const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const oners = ['deviceType']
    //     const value = parseFloat(e.target.value)
    //     const name = e.target.name

    //     const uid = typeof formData?.uid === 'number' ? formData.uid : 0 // Assuming a default value of 0 if undefined

    //     const updatedFormData = { ...formData, [name]: oners.includes(name) ? Number(value.toFixed(1)) : Number(value.toFixed(2)), uid: uid }
    //     setFormData(updatedFormData)
    // }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <FormBreadcrumbs currentPage="Single Box" />

            <FormHeader title="Single Box" />

            <Card>
                <CardContent className="grid gap-8 p-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-3 items-center">
                            <Label htmlFor="deviceType" className="w-32 whitespace-nowrap">
                                Device Type
                            </Label>
                            <Input
                                type="string"
                                id="deviceType"
                                className="h-10"
                                disabled={true}
                                value={formData.deviceType}
                                onChange={e => setFormData({ ...formData, deviceType: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-3 items-center">
                            <Label htmlFor="uid" className="w-32 whitespace-nowrap">
                                Box UID
                            </Label>
                            <Input type="number" id="uid" min={0} className="h-10" disabled={loading} value={formData.uid} onChange={e => setFormData({ ...formData, uid: Number(e.target.value) })} />
                        </div>
                    </div>

                    <div className="w-full flex gap-3">
                        <Button className="w-full" onClick={() => onSubmit('checkin')}>
                            Chekin
                        </Button>
                        <Button className="w-full" variant="outline" onClick={() => onSubmit('packet')}>
                            Passage
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SingleBoxForm
