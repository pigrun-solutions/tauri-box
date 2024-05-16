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
import { useSettingsStore } from '@/zustand/settings-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

const SingleBoxForm = () => {
    // const navigate = useNavigate()
    const { socket } = useSocketStore()
    const { settings } = useSettingsStore()
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<SingleBox>({ deviceType: '', uid: 200 })

    const onSubmit = async (submitType: 'checkin' | 'packet') => {
        try {
            setLoading(true)

            if (formData.uid === 100) return

            if (submitType === 'checkin') {
                const latScaled = (settings.lat * 2147483648) / 90
                const lonScaled = (settings.long * 2147483648) / 180

                const BufferSize: number = 112
                const SYNCH: number[] = [0x21, 0x7e]

                // ? Define other values
                let length: number = 108 // Placeholder for length
                const squence: number = 0x01 // Sequence
                const packetId: number = 0x01 // Packet ID

                // ? Create a typed array with Uint8Array
                const buffer = new Uint8Array(BufferSize) // Allocate buffer of BufferSize bytes

                // ? Write values to the buffer
                buffer.set(new Uint8Array(SYNCH), 0) // Write SYNCH values at offset 0
                buffer[2] = (length >> 8) & 0xff // Write length MSB at offset 2
                buffer[3] = length & 0xff // Write length LSB at offset 3
                buffer[4] = squence // Write squence at offset 4
                buffer[5] = packetId // Write packetId at offset 4
                // ? UID
                buffer.set(new Uint8Array([(formData.uid >> 24) & 0xff, (formData.uid >> 16) & 0xff, (formData.uid >> 8) & 0xff, formData.uid & 0xff]), 6) // Write UID at offset 6

                // ! GPS Info
                // ? Latitude
                buffer.set(new Uint8Array([(latScaled >> 24) & 255, (latScaled >> 16) & 255, (latScaled >> 8) & 255, latScaled & 255]), 10) // Write Latitude at offset 10
                // ? Longitude
                buffer.set(new Uint8Array([(lonScaled >> 24) & 255, (lonScaled >> 16) & 255, (lonScaled >> 8) & 255, lonScaled & 255]), 14) // Write Longitude at offset 14
                // ? Alt
                buffer.set(new Uint8Array([97 >> 8, 97 & 255]), 18) // Write Altitude at offset 18
                // ? SatCnt
                buffer[20] = 9 & 255 // Write SatCnt at offset 20
                // ? Hdilution
                buffer.set(new Uint8Array([90 >> 8, 90 & 255]), 21) // Write Hdilution at offset 21

                // ! Diagnostic Info
                // ? Device Time
                buffer[23] = 10 & 255
                buffer[24] = 0 & 255
                buffer[25] = 8 & 255
                buffer[26] = 47 & 255
                // ? Hardware Version
                const hardwareVersion = '0.0.1'
                const [major, minor, patch] = hardwareVersion.split('.').map(Number)
                buffer[27] = major & 255 // major version (lower byte)
                buffer[28] = minor & 255 // minor version
                buffer[29] = patch & 255 // patch version
                // ? Firmware Version
                const firmwareVersion = '0.0.1'
                const [fMajor, fMinor, fPatch] = firmwareVersion.split('.').map(Number)
                buffer[30] = fMajor & 255 // major version (lower byte)
                buffer[31] = fMinor & 255 // minor version
                buffer[32] = fPatch & 255 // patch version
                // ? Battery
                buffer[33] = (6364 >> 8) & 255
                buffer[34] = 6364 & 255
                // ? Error Code
                buffer[35] = (0 >> 8) & 255
                buffer[36] = 0 & 255
                // ? RSSI
                buffer[37] = 0 & 255
                // ? RSSP
                buffer[38] = 0 & 255
                // ? RSSQ
                buffer[39] = 0 & 255
                // ? SD File Count
                buffer[40] = (12 >> 8) & 255
                buffer[41] = 12 & 255
                // ? SD Off Count
                buffer[42] = (0 >> 8) & 255
                buffer[43] = 0 & 255
                // ? SD ON Count
                buffer[44] = (0 >> 8) & 255
                buffer[45] = 0 & 255
                // ? PSG Count
                buffer[46] = 61 & 255
                // ? PSG Frequency
                buffer[47] = 0 & 255
                // ? PSG Time
                const psgTime = new Date('2024-01-24T22:34:11.864+00:00').getTime()
                buffer[48] = psgTime & 255 // byte 1 (lowest byte)
                buffer[49] = (psgTime >> 8) & 255 // byte 2
                buffer[50] = (psgTime >> 16) & 255 // byte 3
                buffer[51] = (psgTime >> 24) & 255 // byte 4
                buffer[52] = (psgTime >> 32) & 255 // byte 5
                buffer[53] = (psgTime >> 40) & 255 // byte 6
                buffer[54] = (psgTime >> 48) & 255 // byte 7
                buffer[55] = (psgTime >> 56) & 255 // byte 8 (highest byte)

                // ! Settings
                // ? POWER
                const powerMode = 0,
                    powerOn = 0,
                    powerOff = 0,
                    cellMode = 0,
                    cellOn = 0
                const settingsByte = (powerMode << 7) | (powerOn << 5) | (powerOff << 2) | (cellMode << 1) | cellOn
                buffer[56] = settingsByte
                // ? POWER 2
                const cellOff = 0,
                    gpsMode = 0,
                    gpsOn = 0,
                    gpsOff = 0,
                    recMode = 0
                const settingsByte2 = (cellOff << 7) | (gpsMode << 6) | (gpsOn << 5) | (gpsOff << 4) | (recMode & 15)
                buffer[57] = settingsByte2
                // ? DETECTORS
                const bleAdvMode = 0,
                    coilGain = 0,
                    geoGain = 0,
                    detMode = 0,
                    geoDet = 0
                const detectorsByte = (bleAdvMode << 7) | (coilGain << 4) | (geoGain << 1) | (detMode << 0) | geoDet
                buffer[58] = detectorsByte
                // ? DETECTORS 2
                const detFreq = 22,
                    streamMode = 0
                const detectorsByte2 = (detFreq << 4) | streamMode
                buffer[59] = detectorsByte2
                // ? DETECTORS 3
                const MAGDet = 0,
                    ELFDet = 0,
                    GEODet = 0,
                    ExtGeo = 0,
                    ExtCoil = 0,
                    ExtPWR = 20
                const detectorsByte3 = (MAGDet << 7) | (ELFDet << 6) | (GEODet << 5) | (ExtGeo << 4) | (ExtCoil << 3) | (ExtPWR & 7)
                buffer[60] = detectorsByte3
                // ? ELF Power Thresh
                buffer[61] = 20 & 255
                // ? ELF SNR Thresh
                buffer[62] = 20 & 255
                // ? ELF Peak Width
                buffer[63] = 28 & 255
                // ? ELF Pulse Width
                buffer[64] = 28 & 255
                // ? GEOPwrThresh
                buffer[65] = 40 & 255
                // ? GEOPulseWidth
                buffer[66] = 28 & 255
                // ? MAGPwrThresh
                buffer[67] = 40 & 255
                // ? MAGPulseWidth
                buffer[68] = 28 & 255
                // ? MAGAnalyzePeriod
                buffer[69] = 20 & 255
                // ? GEOAnalyzePeriod
                buffer[70] = 20 & 255
                // ? ELFAnalyzePeriod
                buffer[71] = 20 & 255

                // socket?.emit('data', buffer)

                socket?.send(buffer)
                toast.success('Checkin sent successfully!')
            } else if (submitType === 'packet') {
                const latScaled = (settings.lat * 2147483648) / 90
                const lonScaled = (settings.long * 2147483648) / 180

                const BufferSize: number = 112
                const SYNCH: number[] = [0x21, 0x7e]

                // Define other values
                let length: number = 108 // Placeholder for length
                const squence: number = 0x01 // Sequence
                const packetId: number = 0x01 // Packet ID

                // Create a typed array with Uint8Array
                const buffer = new Uint8Array(BufferSize) // Allocate buffer of BufferSize bytes

                // Write values to the buffer
                buffer.set(new Uint8Array(SYNCH), 0) // Write SYNCH values at offset 0
                buffer[2] = (length >> 8) & 0xff // Write length MSB at offset 2
                buffer[3] = length & 0xff // Write length LSB at offset 3
                buffer[4] = squence // Write squence at offset 4
                buffer[5] = packetId // Write packetId at offset 4
                // ? UID
                buffer.set(new Uint8Array([(formData.uid >> 24) & 0xff, (formData.uid >> 16) & 0xff, (formData.uid >> 8) & 0xff, formData.uid & 0xff]), 6) // Write UID at offset 6

                // ! GPS Info
                // ? Latitude
                buffer.set(new Uint8Array([(latScaled >> 24) & 255, (latScaled >> 16) & 255, (latScaled >> 8) & 255, latScaled & 255]), 10) // Write Latitude at offset 10
                // ? Longitude
                buffer.set(new Uint8Array([(lonScaled >> 24) & 255, (lonScaled >> 16) & 255, (lonScaled >> 8) & 255, lonScaled & 255]), 14) // Write Longitude at offset 14
                // ? Alt
                buffer.set(new Uint8Array([97 >> 8, 97 & 255]), 18) // Write Altitude at offset 18
                // ? SatCnt
                buffer[20] = 9 & 255 // Write SatCnt at offset 20
                // ? Hdilution
                buffer.set(new Uint8Array([90 >> 8, 90 & 255]), 21) // Write Hdilution at offset 21

                // ! Passages
                // ? PSG Type
                buffer[23] = 0 & 255
                // ? PSG Count
                buffer[24] = NaN & 255
                // ? PSG Frequency
                buffer[25] = NaN & 255

                // ! Time
                const time = new Date().getTime()
                buffer[26] = time & 255 // byte 1 (lowest byte)
                buffer[27] = (time >> 8) & 255 // byte 2
                buffer[28] = (time >> 16) & 255 // byte 3
                buffer[29] = (time >> 24) & 255 // byte 4
                buffer[30] = (time >> 32) & 255 // byte 5
                buffer[31] = (time >> 40) & 255 // byte 6
                buffer[32] = (time >> 48) & 255 // byte 7
                buffer[33] = (time >> 56) & 255 // byte 8 (highest byte)

                // ! DET
                // ? DetIndex
                buffer.set(new Uint8Array([0 >> 8, 0 & 255]), 34)
                // ? RawType
                buffer[36] = NaN & 255

                console.log(buffer)
                // socket?.emit('rawBytes', buffer)
            }
        } catch (error) {
            console.log(error)
            toast.error(error as string)
        } finally {
            setLoading(false)
        }
    }

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
