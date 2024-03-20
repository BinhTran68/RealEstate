import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { Button, InputFrom, InputRadio } from '..';
import { useForm } from 'react-hook-form';
import { apiLogin, apiRegister } from '~/api/auth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAppStore } from '~/store/useAppStore';
import { useUserStore } from '~/store/useUserStore';


const Auth = () => {

  const [variant, setVariant] = useState('LOGIN');

  const { register, formState: { errors }, handleSubmit, reset } = useForm(); 

  const [isLoading, setIsLoading] = useState(false);

  const { setModal }  = useAppStore();

  const { token ,setToken } = useUserStore();

  console.log(token);

  useEffect(() => {
    reset()
  }, [variant])

  
  const handleOnSubmit = async (data) => {
    if (variant === "REGISTER") {
      setIsLoading(true);
      const respone = await apiRegister(data);
      setIsLoading(false);
      if (respone.success) {
        Swal.fire({
          icon: 'success',
          title: 'Congrats',
          text: respone.message,
          showConfirmButton: true,
          confirmButtonText: 'Go sign in'
        }).then(({ isConfirmed }) => {
          if (isConfirmed) setVariant("LOGIN")
        })
      } else {
        toast.error(respone.message)
      }
    }else {
      const {name, role, ...payload} = data 
      setIsLoading(true);  
      const respone = await apiLogin(payload);
      if (respone.success) {
        console.log(respone);
        toast.success(respone.message)
        setToken(respone.token)
        setModal(false, null);
      }
      setIsLoading(false);
    }

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
      <form className='flex w-full px-4 justify-start flex-col gap-3'>
        <InputFrom
          label={'Phone Number'}
          inputClassname={"rounded-md"}
          register={register}
          id={'phone'}
          placeholder={"Type your phonenumber here"}
          validate={{
            required: 'Phonenumber field cannot emplty.',
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Please enter a valid phone number"
            }
          }}
          errors={errors}
          autoComplete='tel'
        />
        <InputFrom
          label={'Password'}
          inputClassname={"rounded-md"}
          register={register}
          id={'password'}
          placeholder={"Type your password here"}
          type='password'
          validate={{ required: 'Password field cannot empty.' }}
          errors={errors}
          autoComplete='current-password'
        />
        {variant !== 'LOGIN' &&
          <InputFrom
            label={'Your Fullname'}
            inputClassname={"rounded-md"}
            register={register}
            id={'name'}
            placeholder={"Type your name here"}
            type='text'
            validate={{ required: 'Fullname field cannot empty.' }}
            errors={errors}
          />
        }

        {variant !== 'LOGIN' &&
          <InputRadio
            inputClassname={""}
            register={register}
            label={"You are ?"}
            id={'role'}
            type='text'
            validate={{ required: 'This field cannot empty.' }}
            options={[
              {
                label: "User",
                value: "USER",
                checked: true
              },
              {
                label: "Agent",
                value: "AGENT",
                checked: false
              },
            ]}
          />
        }
        <Button handleOnclick={handleSubmit(handleOnSubmit)} disabled={isLoading} className={'py-2 mt-5 mb-2 '}>
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <span className='cursor-pointer hover:underline w-full text-center text-main-500'>
          Forgot your password
        </span>

      </form>
    </div>
  )
}

export default Auth
