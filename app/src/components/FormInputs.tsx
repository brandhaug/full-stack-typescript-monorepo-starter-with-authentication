import React from 'react'
import { SetStateFn } from '../types/custom'

type InputProps = { key: string; type: string; label: string | JSX.Element, options?: { text: string, value: string, icon: JSX.Element }[] } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const FormInputs = <T extends { [key: string]: string | number | boolean }>({
  inputs,
  formData,
  setFormData
}: {
  inputs: InputProps[]
  formData: T
  setFormData: SetStateFn<T>
}) => {
  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => {
      const newValue = typeof formData[key] === 'boolean' ? event.target.checked : event.target.value
      return { ...prevFormData, [key]: newValue }
    })
  }

  const handleSelectChange = (key: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prevFormData => {
      return { ...prevFormData, [key]: event.target.value }
    })
  }

  return (
    <>
      {inputs.map(input => {
        if (input.type === 'checkbox') {
          return (
            <div key={input.key} className='flex align-center my-2'>
              <input className='checkbox mr-2' type={input.type} id={input.key} name={input.key} onChange={handleChange(input.key)} checked={formData[input.key] as boolean} required />
              <label htmlFor={input.key}>{input.label}</label>
            </div>
          )
        }

        if (input.type === 'select') {
          return (
            <div key={input.key}>
              <label>{input.label}</label>
              <select className='form-control' onChange={handleSelectChange(input.key)} value={formData[input.key] as string}>
                {input.options?.map(option => {
                  return (
                    <option key={option.value} value={option.value}>{option.icon} {option.text}</option>
                  )
                })}
              </select>
            </div>
          )
        }

        return (
          <div key={input.key}>
            <label>{input.label}</label>
            <input className='form-control' type={input.type} placeholder={input.label as string} onChange={handleChange(input.key)} value={formData[input.key] as string} minLength={input.minLength} required />
          </div>
        )
      })}
    </>
  )
}
