import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { apiUploadImages } from '~/api/beyond'
import { ImSpinner2 } from "react-icons/im"
import SpinnerLoading from '~/components/commons/SpinnerLoading'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'

const InputFile = ({
  containerClassname,
  label,
  id,
  inputClassname,
  validate,
  multiple = false,
  getImages,
  ...restProps
}) => {

  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { register, formState: { errors }, watch } = useForm()
  const rawImages = watch(id);
  const handleUpload = async (files) => {
    const formData = new FormData()
    setIsLoading(true)
    const upLoadPromises = []
    for (const file of files) {
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      upLoadPromises.push(apiUploadImages(formData))
    }
    const response = await Promise.all(upLoadPromises);
    console.log(response);
    setIsLoading(false)
    if (response && response.length > 0) {
      const tempArrImage = []
      for (let result of response) {
        if (result.status === 200) {
          tempArrImage.push({ id: result.data.public_id, path: result.data.secure_url })
        }
      }
      setImages(tempArrImage)
    } else {
      toast.error("Something was wrong")
    }
  }
  useEffect(() => {
    if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages);
    }
  }, [rawImages])

  useEffect(() => {
    if (images && images.length > 0) {
      console.log(images);
      getImages(images)
    }
  }, [images])


  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
      {label && <span className='font-medium text-main-700'>{label}</span>}
      <input
        className='hidden'
        type='file'
        id={id}
        {...register(id, validate)}
        {...restProps}
        multiple={multiple}
      />
      <label htmlFor={id} className='bg-gray-100 w-full p-16 flex items-center flex-col gap-2 justify-center'>
        {isLoading ?
          <SpinnerLoading size={25} /> :
          images.length > 0 ?
            <div className='grid grid-cols-4 gap-4 rela'>
              {images?.map(el => (
                <div key={el.id} className='col-span-1 relative'>
                  <span onClick={ (e) => { e.stopPropagation();  setImages(prev => prev.filter(item => item.id !== el.id))}}
                    className='w-6 h-6 bg-gray-50 rounded-full  flex items-center justify-center cursor-pointer absolute top-1 right-1'>
                    <AiOutlineCloseCircle />
                  </span>
                  <img src={el.path} alt="" className='w-full object-contain'  onClick={(e) => e.stopPropagation()} />
                </div>
              ))}
            </div> : <>
              <span className='text-5xl text-gray-300'>
                <FaCloudUploadAlt />
              </span>
              <small className='text-gray-300 italic'>
                Only support image with extension JPEG, PNG, JPG.
              </small>
            </>

        }

      </label>
      {errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default InputFile