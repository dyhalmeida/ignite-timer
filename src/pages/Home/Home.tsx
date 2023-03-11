import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewFormCycle } from './components/NewFormCycle'
import { CountDown } from './components/CountDown'
import { useCycles } from '../../hooks/useCycles'

const formValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo de 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type FormData = zod.infer<typeof formValidationSchema>

export function Home() {
  const { activeCycle, interruptCurrentCycle, createNewCycle } = useCycles()

  const cycleForm = useForm<FormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  /** Loga os erros do formulário validado pelo zod */
  // console.log(cycleForm.formState.errors)

  const task = cycleForm.watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: FormData) => {
    createNewCycle(data)
    cycleForm.reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={cycleForm.handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...cycleForm}>
          <NewFormCycle />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
