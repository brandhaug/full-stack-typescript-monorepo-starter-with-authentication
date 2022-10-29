import React from 'react'
import { SetStateFn } from '../types/custom'
import Select  from 'react-select'

type ValueType = string | number | boolean | object | null

type Option = { label: string, value: ValueType, icon: JSX.Element }

type InputProps = { key: string; type: string; label: string | JSX.Element, options?: Option[] } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const FormInputs = <T extends { [key: string]: ValueType }>({
  inputs,
  formData,
  setFormData
}: {
  inputs: InputProps[]
  formData: T
  setFormData: SetStateFn<T>
}) => {
  const handleChange = (key: string) => (value: string | number | boolean | object | null) => {
    setFormData(prevFormData => {
      return { ...prevFormData, [key]: value }
    })
  }

  const handleSelectChange = (key: string) => (option: Option | null) => {
    handleChange(key)(option?.value ?? null)
  }

  const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = typeof formData[key] === 'boolean' ? event.target.checked : event.target.value
    handleChange(key)(newValue)
  }

  return (
    <>
      {inputs.map(input => {
        if (input.type === 'checkbox') {
          return (
            <div key={input.key} className='flex align-center my-2'>
              <input className='checkbox mr-2' type={input.type} id={input.key} name={input.key} onChange={handleInputChange(input.key)} checked={formData[input.key] as boolean} required />
              <label htmlFor={input.key}>{input.label}</label>
            </div>
          )
        }

        if (input.type === 'select' && input.options) {
          const matchingOption = input.options.find(option => option.value === formData[input.key])

          return (
            <div key={input.key}>
              <label>{input.label}</label>
              <Select<Option> classNamePrefix='react-select' isSearchable={false} onChange={handleSelectChange(input.key)} value={matchingOption} options={input.options} />
            </div>
          )
        }

        return (
          <div key={input.key}>
            <label>{input.label}</label>
            <input className='form-control' type={input.type} placeholder={input.label as string} onChange={handleInputChange(input.key)} value={formData[input.key] as string} minLength={input.minLength} required />
          </div>
        )
      })}
    </>
  )
}
