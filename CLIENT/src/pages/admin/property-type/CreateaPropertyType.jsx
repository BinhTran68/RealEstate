import React, { useEffect, useState } from 'react'
import { Button, InputFrom } from '~/components'
import Title from '~/components/commons/Title'
import { useForm } from 'react-hook-form';
import Texterea from '~/components/inputs/Texterea';
import InputImageFiles from '~/components/inputs/InputImageFiles';
import { apiUploadImages } from '~/api/beyond'
import { toast } from 'react-toastify';
import { apiCreateNewPropertyType } from '~/api/propertyTypeApi';
import ComponentSpinner from '~/components/commons/ComponentSpinner';


const CreateaPropertyType = () => {

  const { register, formState: { errors }, setError, clearErrors, handleSubmit, reset, setValue } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [clearImages, setClearImages] = useState(false)

  const hadleCreateNewPropertyType = async (data) => {
    // When submit. Loop arr File then Save by Clould
    setIsLoading(true)
    const upLoadPromises = []
    const formData = new FormData();
    if (data.images.length < 1) {
      setError('images', { type: 'manual', message: "This field can't be empty" });
      return;
    }
    for (const image of data.images) {
      formData.append('file', image)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      upLoadPromises.push(apiUploadImages(formData))
    }
    const responseSendToCloud = await Promise.all(upLoadPromises);
    if (responseSendToCloud && responseSendToCloud.length > 0) {
      for (const result of responseSendToCloud) {
        if (result.status === 200) {
          data.image = result?.data.secure_url
          delete data.images;
        }
      }
    } else {
      toast.error("Something went wrong")
      return;
    } 

    await apiCreateNewPropertyType(data).then((res)=> {
      if (res.success) {
        toast.success(res.message)
        reset()
        setClearImages(true)
      }
    })
  
    setIsLoading(false)
  }



  return (
    <div className=''>
      {isLoading && <ComponentSpinner />}
      <div>
        <Title title={"Create New Property Type"}>
          <Button
            disabled={isLoading}
            className={"font-semibold"}
            handleOnclick={handleSubmit(hadleCreateNewPropertyType)} >
            Create
          </Button>
        </Title>
      </div>
      <form className='p-4 flex flex-col gap-4'>
        <InputFrom
          id={'name'}
          register={register}
          inputClassname={"rounded-md"}
          errors={errors}
          validate={{ required: "This field can't emplty" }}
          label={'Property Type Name'}
        />

        <Texterea
          id={'description'}
          register={register}
          inputClassname={"rounded-md"}
          errors={errors}
          label={'Description'}
          validate={{ required: "This field can't emplty" }}
        />
        <InputImageFiles
          id={'images'}
          label={'Image'}
          getImages={images => setValue('images', images)}
          multiple={false}
          errors={errors}
          clearError={clearErrors}
          resetImages={clearImages}
        />
      </form>

    </div>
  )


}

export default CreateaPropertyType
