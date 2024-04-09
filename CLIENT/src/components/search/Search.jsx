import React from 'react'
import SearchItem from './SearchItem'
import { Button, InputFrom } from '..'
import { useForm } from 'react-hook-form'
import InputSelect from '~/components/inputs/InputSelect'

const Search = () => {

  const { register, formState: { errors } } = useForm()

  return (
    <div className='bg-white py-8 grid grid-cols-4 rounded-md shadow-md w-[1096px] mx-auto  h-[8em] -mt-[5em] relative z-20' >
      <SearchItem title={'Locations'} className={'border-r'}>
        <InputFrom
          id={'address'}
          register={register}
          errors={errors}
          placeholder={'Type your required locations'}
          containerClassname={'w-[14em]'}
          inputClassname={'rounded-md border border-gray-300'}

        />
      </SearchItem>
      <SearchItem title={'Properties Type'} className={'border-r'}>
        <InputSelect
          id={'property-type'}
          register={register}
          errors={errors}
          containerClassname={'w-[14em]'}
          inputClassname={'rounded-md border border-gray-300'}
          placeholder={'Select'}
        />
      </SearchItem>
      <SearchItem title={'Rent range'} className={'border-r'}>
        <InputSelect
          id={'property-type'}
          register={register}
          errors={errors}
          containerClassname={'w-[14em]'}
          inputClassname={'rounded-md border border-gray-300'}
          placeholder={'Select'}
        />
      </SearchItem>
      <div className='flex items-center justify-center'>
        <Button className={'px-8'} >
          Search
        </Button>
      </div>

    </div>
  )
}

export default Search
