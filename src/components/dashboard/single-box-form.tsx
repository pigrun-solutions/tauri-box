import { toast } from 'sonner'
import GeoModal from './geo-modal'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { SingleBox } from '@/types/types'
import { Input } from '@/components/ui/input'
import { invoke } from '@tauri-apps/api/tauri'
import FormHeader from '@/components/ui/form-header'
import { useSocketStore } from '@/zustand/socket-store'
import { Card, CardContent } from '@/components/ui/card'
import { useSettingsStore } from '@/zustand/settings-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

// Function to generate sine wave samples
let phase = 0
let phaseGeo = 0

function generateSineWave(frequency = 500, samplingRate: number, sampleCount: number) {
    const samples = new Array(sampleCount)
    const angularFrequency = 2 * Math.PI * frequency
    const deltaT = 1 / samplingRate

    for (let i = 0; i < sampleCount; i++) samples[i] = Math.sin(angularFrequency * (phase + i * deltaT)) * 1000

    phase = (phase + sampleCount * deltaT) % (1 / frequency)

    return samples
}
function generateSineWaveGeo(frequency = 500, samplingRate: number, sampleCount: number) {
    const samples = new Array(sampleCount)
    const angularFrequency = 2 * Math.PI * frequency
    const deltaT = 1 / samplingRate

    for (let i = 0; i < sampleCount; i++) samples[i] = Math.sin(angularFrequency * (phase + i * deltaT)) * 1000

    phaseGeo = (phaseGeo + sampleCount * deltaT) % (1 / frequency)

    return samples
}

const SingleBoxForm = () => {
    const { status, setStatus } = useSocketStore()
    const { settings } = useSettingsStore()
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<SingleBox>({ deviceType: '', uid: 200 })

    const [streaming, setStreaming] = useState<boolean>(false)
    const streamInterval = useRef<NodeJS.Timeout | null>(null)

    const onSubmit = async (submitType: 'checkin' | 'packet' | 'stream') => {
        try {
            setLoading(true)

            if (formData.uid === 100) return

            if (submitType === 'checkin') {
                const BufferSize: number = 112
                const SYNCH: number[] = [0x21, 0x7e]
                const length: number = 108 // Updated length
                const sequence: number = 0x01
                const packetId: number = 0x01

                const buffer = new Uint8Array(BufferSize)

                // Helper function to write 32-bit integer
                const writeUint32 = (value: number, offset: number) => {
                    buffer.set(new Uint8Array([(value >> 24) & 0xff, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff]), offset)
                }

                // Helper function to write 16-bit integer
                const writeUint16 = (value: number, offset: number) => {
                    buffer.set(new Uint8Array([(value >> 8) & 0xff, value & 0xff]), offset)
                }

                // Write packet header
                buffer.set(new Uint8Array(SYNCH), 0)
                writeUint16(length, 2)
                buffer[4] = sequence
                buffer[5] = packetId

                // Write UID
                writeUint32(formData.uid, 6)

                // Write GPS Info
                const latScaled = Math.round((settings.lat * 2147483648) / 90)
                const lonScaled = Math.round((settings.long * 2147483648) / 180)
                writeUint32(latScaled, 10)
                writeUint32(lonScaled, 14)
                writeUint16(97, 18) // Altitude
                buffer[20] = 9 // SatCnt
                writeUint16(90, 21) // Hdilution

                // Write Diagnostic Info
                const now = new Date()
                buffer[23] = now.getUTCDate()
                buffer[24] = now.getUTCHours()
                buffer[25] = now.getUTCMinutes()
                buffer[26] = now.getUTCSeconds()

                // Hardware Version
                const [hwMajor, hwMinor, hwPatch] = '0.0.1'.split('.').map(Number)
                buffer[27] = hwMajor
                buffer[28] = hwMinor
                buffer[29] = hwPatch

                // Firmware Version
                const [fwMajor, fwMinor, fwPatch] = '0.0.1'.split('.').map(Number)
                buffer[30] = fwMajor
                buffer[31] = fwMinor
                buffer[32] = fwPatch

                writeUint16(6364, 33) // Battery
                writeUint16(0, 35) // Error Code
                buffer[37] = 0 // RSSI
                buffer[38] = 0 // RSSP
                buffer[39] = 0 // RSSQ
                writeUint16(12, 40) // SD File Count
                writeUint16(0, 42) // SD Off Count
                writeUint16(0, 44) // SD On Count
                buffer[46] = 61 // PSG Count
                buffer[47] = 0 // PSG Frequency

                // PSG Time
                const psgTime = new Date('2024-01-24T22:34:11.864+00:00').getTime()
                for (let i = 0; i < 8; i++) {
                    buffer[48 + i] = (psgTime >> (i * 8)) & 0xff
                }

                // Write Settings
                buffer[56] = 0 // POWER
                buffer[57] = 0 // POWER 2
                buffer[58] = 0 // DETECTORS
                buffer[59] = 22 // DETECTORS 2
                buffer[60] = 20 // DETECTORS 3
                buffer[61] = 20 // ELF Power Thresh
                buffer[62] = 20 // ELF SNR Thresh
                buffer[63] = 28 // ELF Peak Width
                buffer[64] = 28 // ELF Pulse Width
                buffer[65] = 40 // GEOPwrThresh
                buffer[66] = 28 // GEOPulseWidth
                buffer[67] = 40 // MAGPwrThresh
                buffer[68] = 28 // MAGPulseWidth
                buffer[69] = 20 // MAGAnalyzePeriod
                buffer[70] = 20 // GEOAnalyzePeriod
                buffer[71] = 20 // ELFAnalyzePeriod

                // Calculate CRC
                let crc = 0
                for (let i = 0; i < length - 2; i++) {
                    crc ^= buffer[i] << 8
                    for (let j = 0; j < 8; j++) {
                        if (crc & 0x8000) {
                            crc = ((crc << 1) ^ 0x1021) & 0xffff
                        } else {
                            crc = (crc << 1) & 0xffff
                        }
                    }
                }

                // Write CRC
                writeUint16(crc, length - 2)

                if (!status) {
                    try {
                        const connection = await invoke('connect_to_server', { address: `${settings.ip}:${settings.port}` })
                        console.log(connection)
                        setStatus(connection === 'Connected successfully')
                        console.log('Connected to the server successfully!')
                    } catch (error) {
                        console.error('Failed to connect to server:', error)
                        return
                    }
                }

                try {
                    await invoke('send_checkin_packet', { message: Array.from(buffer) })
                    console.log('Checkin sent successfully!')
                } catch (error) {
                    console.error('Failed to send checkin packet:', error)
                }
            } else if (submitType === 'packet') {
                const latScaled = (settings.lat * 2147483648) / 90
                const lonScaled = (settings.long * 2147483648) / 180

                const BufferSize: number = 640
                const SYNCH: number[] = [0x21, 0x7e]

                // Define other values
                let length: number = 108 // Placeholder for length
                const squence: number = 0x01 // Sequence
                const packetId: number = 0x03 // Packet ID

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
                // const time = new Date().getTime()
                const day = new Date().getUTCDate()
                const month = new Date().getUTCMonth()
                const year = new Date().getUTCFullYear()
                const hour = new Date().getUTCHours()
                const minute = new Date().getUTCMinutes()
                const second = new Date().getUTCSeconds()
                const millisecond = new Date().getUTCMilliseconds()
                const TMs = (hour * 3600 + minute * 60 + second) * 1000 + millisecond
                buffer[26] = 0 & 255
                buffer[27] = (year - 2000) & 255 // byte 8 (highest byte)
                buffer[28] = (month + 1) & 255 // byte 7
                buffer[29] = day & 255 // byte 6
                buffer[30] = (TMs >> 24) & 255 // byte 5
                buffer[31] = (TMs >> 16) & 255 // byte 4
                buffer[32] = (TMs >> 8) & 255 // byte 3
                buffer[33] = TMs & 255 // byte 2

                // ! DET
                // ? DetIndex
                buffer.set(new Uint8Array([0 >> 8, 0 & 255]), 34)
                // ? RawType
                buffer[36] = NaN & 255

                // ? Create a loop that creates valid rawData that will be used to do a coil and geo graph from byte 60 to 640
                const start = 60
                const end = 640
                for (let i = start; i < end; i++) buffer[i] = i % 2 === 0 ? 0xaa : 0x55
                for (let i = start; i < end; i += 8) {
                    const value = 0x1234567890abcdef
                    for (let j = 0; j < 8; j++) buffer[i + j] = (value >> (56 - j * 8)) & 0xff
                }
                for (let i = start; i < end; i++) buffer[i] = i % 256

                if (status === false) {
                    const connection = await invoke('connect_to_server', { address: `${settings.ip}:${settings.port}` })
                    setStatus(connection === 'Connected successfully' ? true : false)
                    toast.success('Connected to the server successfully!')
                }
                try {
                    const response: Uint8Array = await invoke('send_passage_packet', { message: Array.from(buffer) })
                    console.log('Response from server:', new TextDecoder().decode(response))
                } catch (error) {
                    console.error('Failed to send passage packet:', error)
                }
                toast.success('Checkin sent successfully!')
            }
        } catch (error) {
            console.log(error)
            toast.error(error as string)
        } finally {
            setLoading(false)
        }
    }
    const disconnectFromServer = async () => {
        try {
            await invoke('disconnect_from_server')
            setStatus(false)
            toast.success('Disconnected from the box!')
        } catch (error) {
            console.error('Failed to disconnect:', error)
        }
    }

    const onStream = async () => {
        if (!streaming) {
            setStreaming(true)
            streamInterval.current = setInterval(async () => {
                const SYNCH = [0x21, 0x7e]
                const bufferLength = 740 // Total buffer size
                const buffer = new Uint8Array(bufferLength)

                // Write synchronization sequence
                buffer.set(new Uint8Array(SYNCH), 0)

                // Packet length (always 736 in your worker code) at position 2
                const packetLength = 736
                buffer[2] = (packetLength >> 8) & 0xff
                buffer[3] = packetLength & 0xff

                // Sequence number (for example, increment a counter each time)
                const seq = 0 // or use a counter
                buffer[4] = seq & 0xff

                // Packet Type (assuming 4 for regular stream)
                const packetType = 4
                buffer[5] = packetType & 0xff

                // UID first 4 bytes at position 6
                const uid = formData.uid
                buffer[6] = (uid >> 24) & 0xff
                buffer[7] = (uid >> 16) & 0xff
                buffer[8] = (uid >> 8) & 0xff
                buffer[9] = uid & 0xff

                // Time at first sample 8 bytes at position 10
                const now = new Date()
                const time = now.getTime() // Use the current timestamp
                buffer[10] = (time >> 56) & 0xff
                buffer[11] = (time >> 48) & 0xff
                buffer[12] = (time >> 40) & 0xff
                buffer[13] = (time >> 32) & 0xff
                buffer[14] = (time >> 24) & 0xff
                buffer[15] = (time >> 16) & 0xff
                buffer[16] = (time >> 8) & 0xff
                buffer[17] = time & 0xff

                // ? Example usage
                const sineWaveSamplesCoil = generateSineWave(settings.coilFreq, 250, 120)
                const sineWaveSamplesGeo = generateSineWaveGeo(settings.geoFreq, 500, 240)

                // ? Scale the samples to 16-bit integers

                // ? Add geophone and coil samples to the buffer
                let bufferIndex = 18
                for (let i = 0; i < 144; i++) {
                    // Add two geophone samples
                    for (let j = 0; j < 2; j++) {
                        let geoSample = sineWaveSamplesGeo[i * 2 + j]
                        buffer[bufferIndex++] = (geoSample >> 8) & 0xff
                        buffer[bufferIndex++] = geoSample & 0xff
                    }
                    // Add one coil sample
                    let coilSample = sineWaveSamplesCoil[i]
                    buffer[bufferIndex++] = (coilSample >> 8) & 0xff
                    buffer[bufferIndex++] = coilSample & 0xff
                }

                // Calculate checksum and set it at position 738 and 739
                let checksum = 0
                for (let i = 0; i < 738; i++) checksum += buffer[i]

                checksum = checksum & 0xffff
                buffer[738] = (checksum >> 8) & 0xff
                buffer[739] = checksum & 0xff

                // Send the packet to the server
                await invoke('send_stream_packet', { address: `${settings.ip}:${settings.port}`, message: Array.from(buffer) })
            }, settings.duration)
        }
    }
    const disconnectStreaming = async () => {
        if (streamInterval.current) {
            clearInterval(streamInterval.current)
            streamInterval.current = null
        }
        setStreaming(false)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <FormBreadcrumbs currentPage="Single Box" />

            <FormHeader title="Single Box" loading={loading}>
                <GeoModal />
            </FormHeader>

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
                            <Input
                                type="number"
                                id="uid"
                                min={0}
                                className="h-10"
                                disabled={loading || status}
                                value={formData.uid}
                                onChange={e => setFormData({ ...formData, uid: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-full flex gap-3">
                            <Button className="w-full" onClick={() => onSubmit('checkin')} disabled={loading}>
                                {loading && <Loader2 className="size-4 mr-1 animate-spin" />}Chekin
                            </Button>
                            <Button className="w-full" variant="outline" onClick={() => onSubmit('packet')} disabled={loading}>
                                {loading && <Loader2 className="size-4 mr-1 animate-spin" />}Passage
                            </Button>
                            <Button type="button" className="w-full" variant={!streaming ? 'outline' : 'destructive'} onClick={!streaming ? onStream : disconnectStreaming} disabled={loading}>
                                {streaming && <Loader2 className="size-4 mr-1 animate-spin" />}
                                {streaming ? 'Stop streaming' : 'Start Streaming'}
                            </Button>
                        </div>
                        {status && (
                            <Button type="button" className="w-full animate-in fade-in zoom-in" variant="destructive" onClick={disconnectFromServer} disabled={loading}>
                                Disconnect
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SingleBoxForm
