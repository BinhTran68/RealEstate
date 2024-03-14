 import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
 
 const InputFrom = ({
  style = 'form-input',
  containerClassname, 
  label, 
  id, 
  type= 'text',
  register,
  errors,
  inputClassname,
  validate, 
  placeholder
}) => {
   return (
     <div className={twMerge(clsx('flex flex-col gap-2'))}>
        {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
        <input 
        type={type} 
        id={id}  
        className={twMerge(clsx(style,'placeholder:text-sm ',  inputClassname, errors && errors[id] && 'border-red-500 focus:border-red-500 focus:ring-red-500' ))}
        {...register(id, validate)} 
        placeholder={placeholder}
        />
        { errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small> }
     </div>
   )
 }
 
 export default InputFrom