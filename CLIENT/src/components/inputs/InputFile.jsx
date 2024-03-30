import clsx from 'clsx'
import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

const InputFile = ({
  containerClassname,
  label,
  id,
  register,
  errors,
  inputClassname,
  validate,
  placeholder,
  ...restProps // Thuộc tính còn lại
}) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
      {label && <span className='font-medium text-main-700'>{label}</span>}
      <input
        className='hidden'
        type='file'
        id={id}
        {...register(id, validate)}
        placeholder={placeholder}
        {...restProps}
      />
      <label htmlFor={id} className='bg-gray-100 w-full p-16 flex items-center flex-col gap-2 justify-center'> 
        <span className='text-5xl text-gray-300'>
            <FaCloudUploadAlt/>
        </span>
        <small className='text-gray-300 italic'>
            Only support image with extension JPEG, PNG, JPG.
        </small>

      </label>
      {errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default InputFile