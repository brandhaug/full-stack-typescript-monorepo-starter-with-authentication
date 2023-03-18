import React from 'react'

import { type Path, type UseFormReturn } from 'react-hook-form'
import { type Form, type FormInput } from '../types/form'
import { Select } from './Select'
import { Checkbox, Input } from '@fstmswa/ui'

export const FormInputs = <T extends Form>({ inputs, formData }: { inputs: Array<FormInput<T>>; formData: UseFormReturn<T> }): JSX.Element | null => {
  return (
    <>
      {inputs.map((input) => {
        const key = String(input.key) as Path<T>

        if (input.type === 'checkbox') {
          return <Checkbox key={key} id={key} label={input.label} {...formData.register(key)} required />
        }

        if (input.type === 'select' && input.options) {
          return (
            <div key={key}>
              <label>{input.label}</label>
              <Select formData={formData} input={input} />
            </div>
          )
        }

        return <Input key={key} id={key} type={input.type} label={input.label} required {...formData.register(key)} />
      })}
    </>
  )
}
