import { create } from 'zustand'
import { Settings } from '@/types/types'

type SettingsStore = {
    settings: Settings
    setSettings: (settings: Settings) => void
}

export const useSettingsStore = create<SettingsStore>(set => ({
    settings: {} as Settings,
    setSettings: (settings: Settings) => set({ settings }),
}))
