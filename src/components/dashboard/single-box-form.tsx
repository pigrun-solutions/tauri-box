import { toast } from 'sonner'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { SingleBox } from '@/types/types'
import { Input } from '@/components/ui/input'
import FormHeader from '@/components/ui/form-header'
// import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import FormBreadcrumbs from '@/components/ui/form-breadcrumbs'

const SingleBoxForm = () => {
    // const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<SingleBox>({ deviceType: '', uid: 0 })

    const onSubmit = async (submitType: 'checkin' | 'packet') => {
        try {
            setLoading(true)
            console.log({ ...formData, submitType })
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
