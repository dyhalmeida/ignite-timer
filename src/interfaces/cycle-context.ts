import { ICreateNewCycle } from './create-new-cycle'
import { ICycle } from './cycle'

export interface ICyclesContext {
  cycles: ICycle[]
  activeCycle?: ICycle
  activeCycleId: string | null
  amountSecondsPast: number
  markCurrentCycleAsFinished: () => void
  interruptCurrentCycle: () => void
  createNewCycle: (data: ICreateNewCycle) => void
  setSecondsAmountPast: (value: number) => void
}
