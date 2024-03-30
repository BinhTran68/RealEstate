import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const Texterea = ({
    style = 'form-textarea',
    containerClassname,
    label,
    id,
    type = 'text',
    register,
    errors,
    inputClassname,
    validate,
    placeholder,
    ...restProps // Thuộc tính còn lại
  }) => {
    return (
      <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
        {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
        <textarea
          type={type}
          id={id}
          className={twMerge(clsx(style, 'placeholder:text-sm ', inputClassname, errors && errors[id] && 'border-red-500 focus:border-red-500 focus:ring-red-500'))}
          {...register(id, validate)}
          placeholder={placeholder}
          {...restProps}
          rows={5}
        >

        </textarea>
        {errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
      </div>
    )
  }
  
  export default Texterea
