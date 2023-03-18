import { type Path, useController, type UseFormReturn } from 'react-hook-form'
import ReactSelect, { type SingleValue } from 'react-select'
import React from 'react'
import { type Form, type FormInput, type Option } from '../types/form'

export const Select = <T extends Form>({ input, formData }: { input: FormInput<T>; formData: UseFormReturn<T> }): React.ReactElement => {
  const { field } = useController({ control: formData.control, name: input.key as Path<T> })
  const matchingOption = input.options?.find((option) => option.value === field.value)

  const handleChange = (selectedOption: SingleValue<Option>): void => {
    field.onChange(selectedOption?.value)
  }

  return <ReactSelect<Option> ref={field.ref} isSearchable={false} classNamePrefix='react-select' name={field.name} options={input.options} value={matchingOption} onChange={handleChange} />
}
