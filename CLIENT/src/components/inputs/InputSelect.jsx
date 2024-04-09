import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputSelect = ({
    style = 'form-select',
    containerClassname,
    label,
    id,
    type = 'text',
    register,
    errors,
    inputClassname,
    validate,
    placeholder,
    options=[],
    ...restProps // Thuộc tính còn lại
}) => {
    return (
        <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <select
                type={type}
                id={id}
                className={twMerge(clsx(style, 'placeholder:text-sm ', inputClassname, errors && errors[id] && 'border-red-500 focus:border-red-500 focus:ring-red-500'))}
                {...register(id, validate)}
                placeholder={placeholder}
                {...restProps}
            >
                <option value="">{placeholder}</option> 
                {options.map((el)=> (
                    <option key={el.code} value={el.code}>el.label</option>
                ))}   
            </select>
            {errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputSelect
