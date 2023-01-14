import { Path, useController, UseFormReturn } from 'react-hook-form'
import ReactSelect, { SingleValue } from 'react-select'
import React from 'react'
import { FormValueType } from '@fstmswa/types'
import { FormInput } from './FormInputs'
import { Form } from '../types/form'

export interface Option {
  label: string
  value: FormValueType
}

export const Select = <T extends Form>({ input, formData }: { input: FormInput<T>; formData: UseFormReturn<T> }): React.ReactElement => {
  const { field } = useController({ control: formData.control, name: input.key as Path<T> })
  const matchingOption = input.options?.find((option) => option.value === field.value)

  const handleChange = (selectedOption: SingleValue<Option>): void => {
    field.onChange(selectedOption?.value)
  }

  return <ReactSelect<Option> ref={field.ref} isSearchable={false} classNamePrefix='react-select' name={field.name} options={input.options} value={matchingOption} onChange={handleChange} />
}
