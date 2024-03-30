import React from 'react'
import { Button, InputFrom } from '~/components'
import Title from '~/components/commons/Title'
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import Texterea from '~/components/inputs/Texterea';
import InputFile from '~/components/inputs/InputFile';


const CreateaPropertyType = () => {
  const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm()

  const hadleCreateNewPropertyType = (data) => {
    console.log(data);
  }

  return (
    <div className=''>
      <div>
        <Title title={"Create New Property Type"}>
          <Button handleOnclick={handleSubmit(hadleCreateNewPropertyType)} className={"flex justify-between "}>
            <CiCirclePlus size={21}/><span>&nbsp; Create</span>
          </Button>
        </Title>
      </div>
      <form className='p-4 flex flex-col gap-4'>
        <InputFrom 
          id={'name'}
          register={register}
          inputClassname={"rounded-md"}
          errors={errors}
          validate={{required: "This field can't emplty"}}
          label={'Property Type Name'}
        />

        <Texterea 
           id={'description'}
           register={register}
           inputClassname={"rounded-md"}
           errors={errors}
           setValue={setValue}
           label={'Description'}
           validate={{required: "This field can't emplty"}}
        />

        <InputFile
           id={'file'}
           register={register}
           errors={errors}
           label={'file'}
           validate={{required: "This field can't emplty"}}
        />

      </form>
    </div>
  )
}

export default CreateaPropertyType
