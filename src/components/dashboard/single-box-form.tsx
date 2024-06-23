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

                if (status === false) {
                    const connection = await invoke('connect_to_server', { address: `${settings.ip}:${settings.port}` })
                    console.log(connection)
                    setStatus(connection === 'Connected successfully' ? true : false)
                    toast.success('Connected to the server successfully!')
                }
                await invoke('send_checkin_packet', { message: Array.from(buffer) })
                toast.success('Checkin sent successfully!')
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
                const sineWaveSamplesCoil = generateSineWave(22, 250, 120)
                const sineWaveSamplesGeo = generateSineWaveGeo(100, 500, 240)

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
                console.log({ Buffer: Array.from(buffer) })

                // Send the packet to the server
                await invoke('send_stream_packet', { address: `${settings.ip}:${settings.port}`, message: Array.from(buffer) })
            }, 200)
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
