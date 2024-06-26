import { z } from 'zod'
import { toast } from 'sonner'
import GeoModal from './geo-modal'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { invoke } from '@tauri-apps/api/tauri'
import FormHeader from '@/components/ui/form-header'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSocketStore } from '@/zustand/socket-store'
import { Card, CardContent } from '@/components/ui/card'
import multiBoxSchema from '@/lib/schemas/multiBoxSchema'
import { useSettingsStore } from '@/zustand/settings-store'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

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

const MultiBoxForm = () => {
    const { settings } = useSettingsStore()
    const { status, setStatus } = useSocketStore()
    const [loading, setLoading] = useState<boolean>(false)
    const [_boxesInfo, setBoxesInfo] = useState<{ uid: number; index: number }[]>()
    let disabledClicked = false

    const form = useForm<z.infer<typeof multiBoxSchema>>({ resolver: zodResolver(multiBoxSchema), defaultValues: { uidTo: 201, uidFrom: 200, checkin: false, checkinTime: 0 } })

    const checkinMaker = (uid: number, lat: number, long: number) => {
        const latScaled = (lat * 2147483648) / 90
        const lonScaled = (long * 2147483648) / 180

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
        buffer.set(new Uint8Array([(uid >> 24) & 0xff, (uid >> 16) & 0xff, (uid >> 8) & 0xff, uid & 0xff]), 6) // Write UID at offset 6

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

        return buffer
    }
    async function disconnectFromAllServers() {
        try {
            disabledClicked = true
            // ? Remove all connections except the last one
            const connectionss = (await invoke('get_connected_server_addresses')) as string[]
            for (let i = 0; i < connectionss.length - 1; i++) await invoke('close_connection_by_client', { clientAddress: connectionss[i] })

            // ? Remove the last one
            const connections = (await invoke('get_connected_server_addresses')) as string[]
            console.log(connections)
            if (connections?.length === 1) {
                await invoke('close_connection_by_client', { clientAddress: connections[0] })
                setStatus(false)
                setBoxesInfo([])
                disabledClicked = false
            }
            toast.success('Disconnected from all servers')
        } catch (error) {
            console.error(error)
        }
    }
    const onSubmit = async (values: z.infer<typeof multiBoxSchema>) => {
        try {
            setLoading(true)

            for (let i = values.uidFrom; i <= values.uidTo; i++) {
                const connect = (await invoke('connect_to_server_new', { address: `${settings.ip}:${settings.port}` })) as number
                setBoxesInfo(prev => [...(prev ?? []), { uid: i, index: connect }])
            }

            toast.success('Started streaming')
            setStatus(true)

            if (values.checkin) {
                const lat = settings.lat
                const long = settings.long
                let buffers: Uint8Array[] = []
                for (let i = values.uidFrom; i <= values.uidTo; i++) buffers.push(checkinMaker(i, lat + i, long + i))

                const sendCheckinPackets = async () => {
                    while (!disabledClicked) {
                        for (let i = 0; i < buffers.length; i++) {
                            await invoke('send_packet_by_client_index', { clientIndex: i, packet: Array.from(buffers[i]) })
                        }
                        await new Promise(resolve => setTimeout(resolve, values.checkinTime! * 1000))
                    }
                }

                sendCheckinPackets()
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    const [streaming, setStreaming] = useState<boolean>(false)
    const streamInterval = useRef<NodeJS.Timeout | null>(null)
    const onStream = async () => {
        if (!streaming) {
            const formData = form.getValues()
            setStreaming(true)
            streamInterval.current = setInterval(async () => {
                const SYNCH = [0x21, 0x7e]
                const bufferLength = 740 // Total buffer size
                const packetLength = 736

                const now = new Date()
                const time = now.getTime() // Use the current timestamp

                // Example sine wave sample generation (implement these functions as needed)
                const sineWaveSamplesCoil = generateSineWave(settings.coilFreq, 250, 120)
                const sineWaveSamplesGeo = generateSineWaveGeo(settings.geoFreq, 500, 240)

                for (let uid = formData.uidFrom; uid <= formData.uidTo; uid++) {
                    const buffer = new Uint8Array(bufferLength)

                    // Write synchronization sequence
                    buffer.set(new Uint8Array(SYNCH), 0)

                    // Packet length (always 736 in your worker code) at position 2
                    buffer[2] = (packetLength >> 8) & 0xff
                    buffer[3] = packetLength & 0xff

                    // Sequence number (for example, increment a counter each time)
                    const seq = 0 // or use a counter
                    buffer[4] = seq & 0xff

                    // Packet Type (assuming 4 for regular stream)
                    const packetType = 4
                    buffer[5] = packetType & 0xff

                    // UID first 4 bytes at position 6
                    buffer[6] = (uid >> 24) & 0xff
                    buffer[7] = (uid >> 16) & 0xff
                    buffer[8] = (uid >> 8) & 0xff
                    buffer[9] = uid & 0xff

                    // Time at first sample 8 bytes at position 10
                    buffer[10] = (time >> 56) & 0xff
                    buffer[11] = (time >> 48) & 0xff
                    buffer[12] = (time >> 40) & 0xff
                    buffer[13] = (time >> 32) & 0xff
                    buffer[14] = (time >> 24) & 0xff
                    buffer[15] = (time >> 16) & 0xff
                    buffer[16] = (time >> 8) & 0xff
                    buffer[17] = time & 0xff

                    // Add geophone and coil samples to the buffer
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
                }
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
            <FormBreadcrumbs currentPage="Multi box" />

            <FormHeader title="Multi Box" loading={loading}>
                <GeoModal />
            </FormHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-4">
                    <Card className="">
                        <CardContent className="p-4">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="uidFrom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="uidFrom" className="whitespace-nowrap">
                                                            UID from
                                                        </FormLabel>
                                                        <Input
                                                            type="number"
                                                            id="uidFrom"
                                                            min={0}
                                                            className="h-8"
                                                            disabled={loading}
                                                            {...field}
                                                            onChange={e => form.setValue('uidFrom', Number(e.target.value))}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="uidTo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel htmlFor="uidTo" className="whitespace-nowrap">
                                                            UID to
                                                        </FormLabel>
                                                        <Input
                                                            type="number"
                                                            id="uidTo"
                                                            min={0}
                                                            className="h-8"
                                                            disabled={loading}
                                                            {...field}
                                                            onChange={e => form.setValue('uidTo', Number(e.target.value))}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={form.control}
                                        name="checkin"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Checkin?</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch('checkin') && (
                                        <FormField
                                            control={form.control}
                                            name="checkinTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center gap-3">
                                                            <FormLabel htmlFor="checkinTime" className="whitespace-nowrap">
                                                                Checkin Timer (s)
                                                            </FormLabel>
                                                            <Input
                                                                type="number"
                                                                id="checkinTime"
                                                                min={0}
                                                                className="h-8"
                                                                disabled={loading}
                                                                {...field}
                                                                onChange={e => form.setValue('checkinTime', Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Button className="w-full" type="submit" disabled={status}>
                                        Start Emulation
                                    </Button>
                                    <Button type="button" className="w-full" variant={!streaming ? 'outline' : 'destructive'} onClick={!streaming ? onStream : disconnectStreaming} disabled={loading}>
                                        {streaming && <Loader2 className="size-4 mr-1 animate-spin" />}
                                        {streaming ? 'Stop streaming' : 'Start Streaming'}
                                    </Button>
                                    {status && (
                                        <Button className="w-full" type="button" variant="destructive" onClick={disconnectFromAllServers}>
                                            Disconnect
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

export default MultiBoxForm
