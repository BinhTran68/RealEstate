import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'


const InputImageFiles = ({
  containerClassname,
  label,
  id,
  inputClassname,
  multiple = false,
  getImages,
  errors,
  clearError,
  resetImages,
  ...restProps
}) => {
  const [images, setImages] = useState([])
  const [imageFiles, setImagesFile] = useState([])

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!multiple && images.length > 0) {
      toast.warning("This field only requires a image")
      return;
    }
    if (!file) {
      return;
    }
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      return false;
    }
    if (file) {
      let reader = new FileReader()
      const urlFile = reader.readAsDataURL(file)
      reader.onload = function (e) {
        const urlFile = e.target.result;
        setImagesFile((prevImages) => [...prevImages, file])
        setImages(prevImagesUrl => [...prevImagesUrl, urlFile]);
      };
    }
  }

  const handleRemoveFile = (index) => {
    const tempImages = [...images];
    const tempImageFiles = [...imageFiles];
    tempImages.splice(index, 1)
    tempImageFiles.splice(index, 1)
    setImages(tempImages)
    setImagesFile(tempImageFiles)
  }

  const clearImages = () => {
    setImages([])
    setImagesFile([])
  }

  useEffect(() => {
    clearImages();
  }, [resetImages])

  useEffect(() => {
    getImages(imageFiles)
    clearError(id)
  }, [imageFiles])

  return (
    <>
      {label && <span className='font-medium text-main-700'>{label}</span>}
      <div className={twMerge(clsx('grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full', containerClassname))}>
        <input
          className='hidden'
          type='file'
          id={id}
          onChange={handleFileSelect}
          {...restProps}
          multiple={multiple}
        />
        {
          images.length > 0 &&
          images?.map((el, index) => (
            <div key={index} className='relative p-3 col-span-1 flex justify-start items-center'>
              <span
                onClick={() => handleRemoveFile(index)}
                className='w-6 h-6 bg-inherit rounded-full  flex items-center justify-center cursor-pointer absolute top-1 right-2'>
                <AiOutlineCloseCircle />
              </span>
              <img src={el} alt="" className='w-full h-[260px] object-contain' />
            </div>
          ))
        }
        <label htmlFor={id} className='w-full max-h-[260px] h-[260px] object-contain rounded-md bg-gray-100 p-9 flex items-center flex-col gap-2 justify-center'>
          <>
            <span className='text-5xl text-gray-300'>
              <FaCloudUploadAlt />
            </span>
            <small className='text-gray-300 italic'>
              Only support image with extension JPEG, PNG, JPG.
            </small>
            {errors && errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
          </>
        </label>

      </div>
    </>
  )

}

export default InputImageFiles