'use client'

import { type UseFormResultType } from '@/interfaces/hooks'
import { useEffect, useState } from 'react'

export const useForm = <T>(initState:T): UseFormResultType<T> => {
  const [formValues, setFormValues] = useState<T>(initState)
  const handleInputChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleSelectChange = (value: string|number, prop: string) => {
    setFormValues({ ...formValues, [prop]: value })
  }
  return {
    formValues,
    handleInputChange,
    handleSelectChange
  }
}
