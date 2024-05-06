import { useEffect } from 'react'

const useDisableContextMenu = () => {
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => event.preventDefault()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === 'F5' ||
                (event.ctrlKey && event.key === 'r') ||
                (event.metaKey && event.key === 'r') ||
                (event.ctrlKey && event.shiftKey && event.key === 'i') ||
                (event.metaKey && event.shiftKey && event.key === 'i')
            )
                event.preventDefault()
        }

        const handleHistoryChange = () => window.history.pushState(null, '', window.location.href)

        const handleMouseButtonDown = (event: MouseEvent) => {
            if (event.button === 3 || event.button === 4) event.preventDefault()
        }

        window.addEventListener('contextmenu', handleContextMenu)
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('popstate', handleHistoryChange)
        window.addEventListener('mousedown', handleMouseButtonDown)

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('popstate', handleHistoryChange)
            window.removeEventListener('mousedown', handleMouseButtonDown)
        }
    }, [])
}

export default useDisableContextMenu
