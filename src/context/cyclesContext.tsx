import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { ICreateNewCycle } from '../interfaces/create-new-cycle'
import { ICycle } from '../interfaces/cycle'
import { ICyclesContext } from '../interfaces/cycle-context'
import { ICyclesState } from '../interfaces/cycles-state'
import {
  addCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer } from '../reducers/cycles/reducer'

export const CyclesContext = createContext({} as ICyclesContext)

export const CyclesProvider = ({ children }: PropsWithChildren) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as ICyclesState,
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPast, setAmountSecondsPast] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const setSecondsAmountPast = (value: number) => {
    setAmountSecondsPast(value)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  const createNewCycle = (data: ICreateNewCycle) => {
    const cycle: ICycle = {
      id: Date.now().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addCycleAction(cycle))
    setSecondsAmountPast(0)
  }

  const value: ICyclesContext = useMemo(
    () => ({
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPast,
      markCurrentCycleAsFinished,
      interruptCurrentCycle,
      createNewCycle,
      setSecondsAmountPast,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCycle, activeCycleId, amountSecondsPast],
  )

  return (
    <CyclesContext.Provider value={value}>{children}</CyclesContext.Provider>
  )
}
