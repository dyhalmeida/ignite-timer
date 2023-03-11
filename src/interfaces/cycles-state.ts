import { ICycle } from './cycle'

export interface ICyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}
