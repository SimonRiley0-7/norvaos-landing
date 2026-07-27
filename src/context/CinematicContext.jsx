import { createContext, useContext, useState, useCallback } from 'react'

const defaultContext = {
  liveMessages: [],
  addLiveMessage: () => {},
  clearLiveMessages: () => {},
}

const CinematicContext = createContext(defaultContext)

export function CinematicProvider({ children }) {
  const [liveMessages, setLiveMessages] = useState([])

  const addLiveMessage = useCallback(msg => {
    setLiveMessages(prev => [...prev, msg].slice(-4)) // keep last 4
  }, [])

  const clearLiveMessages = useCallback(() => {
    setLiveMessages([])
  }, [])

  return (
    <CinematicContext.Provider value={{ liveMessages, addLiveMessage, clearLiveMessages }}>
      {children}
    </CinematicContext.Provider>
  )
}

export const useCinematic = () => useContext(CinematicContext) || defaultContext

