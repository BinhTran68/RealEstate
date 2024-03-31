import React from 'react'
import { Button, InputFrom } from '~/components'
import Title from '~/components/commons/Title'
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import Texterea from '~/components/inputs/Texterea';
import InputFile from '~/components/inputs/InputFile';
import InputFileNotSendCloud from '~/components/inputs/InputFileNotSendCloud';


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
           label={'Description'}
           validate={{required: "This field can't emplty"}}
        />

        {/* <InputFile
           id={'images'}
           label={'Image'}
           validate={{required: "This field can't emplty"}}
           multiple={true}
          getImages={images => setValue('images', images)}
        /> */}

        <InputFileNotSendCloud
            id={'images'}
            label={'Image'}
            validate={{required: "This field can't emplty"}}
           getImages={images => setValue('images', images)}
        />


      </form>
    </div>
  )
}

export default CreateaPropertyType
