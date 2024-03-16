import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'


const InputRadio = ({
    style = 'form-radio',
    containerClassname,
    id,
    label,
    register,
    errors,
    inputClassname,
    validate,
    placeholder,
    options = []
}) => {
    return (
        <div className={twMerge(clsx('flex flex-col   gap-2 w-full'), containerClassname)}>
            {label && <label className='font-medium  text-main-700' htmlFor={id}>{label}</label>}
            {options.map(element => (
                <div className='flex items-center  gap-5' key={element.value}>
                    <input
                        type={"radio"}
                        name={id}
                        id={element.value}
                        value={element.value}
                        className={twMerge(clsx(style, 'placeholder:text-sm cursor-pointer', inputClassname, errors && errors[id] && 'border-red-500 focus:border-red-500 focus:ring-red-500'))}
                        {...register(id, validate)}
                        placeholder={placeholder} 
                        defaultChecked={element.checked ?? false}
                    />
                    {element.label && <label className=' text-main-700 cursor-pointer' htmlFor={element.value}>{element.label}</label>}
                </div>
            ))}

            {errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputRadio