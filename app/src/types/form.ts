import { FormValueType } from '@fstmswa/types'
import React from 'react'

export type Form = Record<string, FormValueType>

export interface Option {
  label: string
  value: FormValueType
}

export type FormInput<T extends Form> = { key: keyof T; type: string; label: string | JSX.Element; options?: Option[] } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
