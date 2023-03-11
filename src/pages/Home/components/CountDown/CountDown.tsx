import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycles } from '../../../../hooks/useCycles'
import { CountdownContainer, SeparatorTimer } from './styles'

export function CountDown() {
  const {
    activeCycleId,
    activeCycle,
    amountSecondsPast,
    markCurrentCycleAsFinished,
    setSecondsAmountPast,
  } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const differenceIeconds = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (differenceIeconds >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          setSecondsAmountPast(totalSeconds)
          return
        }
        setSecondsAmountPast(differenceIeconds)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsAmountPast,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = `${minutesAmount}`.padStart(2, '0')
  const seconds = `${secondsAmount}`.padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorTimer>:</SeparatorTimer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
