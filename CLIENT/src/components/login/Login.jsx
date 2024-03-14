import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { Button, InputFrom } from '..';
import { useForm } from 'react-hook-form';

const Login = () => {

  const [variant, setVariant] = useState('LOGIN');

  const { register, formState: { errors }, handleSubmit, reset } = useForm(); // 

  useEffect(() => {
      reset()
  }, [variant]) 
  console.log(errors);
  const handleOnSubmit = (data) => {
      console.log(data);
    
  }

  return (
    // Xỉ triger cho sự kiện onclick e => e.stopPropagation()
    <div onClick={e => e.stopPropagation()}
      className='bg-white text-lg rounded-md px-6 w-[500px]  py-8 flex flex-col items-center gap-6'>
      <h1 className='text-3xl  font-semibold tracking-tighter'>Well come to BatDongSan.Com</h1>
      <div className='flex border-b  w-full justify-start gap-6 '>
        <span
          onClick={() => setVariant('LOGIN')}
          className={clsx(variant === 'LOGIN' && 'border-b-4 rounded-b-[1.2px] border-main-700', 'cursor-auto')} >Login</span>
        <span
          onClick={() => setVariant('REGISTER')}
          className={clsx(variant === 'REGISTER' && 'border-b-4 rounded-b-[1.2px] border-main-700', 'cursor-pointer')} >Register</span>
      </div>
      <form className='flex w-full px-4 justify-start flex-col gap-5'>
        <InputFrom
          label={'Phone Number'}
          inputClassname={"rounded-md"}
          register={register}
          id={'phone'}
          placeholder={"Type your phonenumber here"}
          validate={{required: 'This field cannot emplty.'}}
          errors={errors}
        />
        <InputFrom
          label={'Password'}
          inputClassname={"rounded-md"}
          register={register}
          id={'password'}
          placeholder={"Type your password here"}
          type='password'
          validate={{required : 'This field cannot empty.'}}
          errors={errors}
        />

        {variant !== 'LOGIN' && 
            <InputFrom
            label={'Your Fullname'}
            inputClassname={"rounded-md"}
            register={register}
            id={'name'}
            placeholder={"Type your name here"}
            type='text'
            validate={{required : 'This field cannot empty.'}}
          />
        }

        <Button handleOnclick={handleSubmit(handleOnSubmit)} className={'py-2 mt-5 mb-2 '}>
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <span className='cursor-pointer hover:underline w-full text-center text-main-500'>
          Forgot your password
        </span>
        
      </form>
    </div>
  )
}

export default Login
