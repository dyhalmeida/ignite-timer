import { useContext } from 'react'
import { CyclesContext } from '../context/cyclesContext'
import { ICyclesContext } from '../interfaces/cycle-context'

export const useCycles = (): ICyclesContext => {
  const context = useContext(CyclesContext)

  if (!context) {
    throw new Error('useCycle must be used within an CyclesProvider')
  }

  return context
}
