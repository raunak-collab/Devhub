import { useEffect } from "react"

export default function useCtrlk(callback) {
    useEffect(() => {
        const handler = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                callback()
            }
        }

        window.addEventListener('keydown', handler)
        
        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [callback])

}
