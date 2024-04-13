import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { Button, InputFrom, InputRadio } from '..';
import { useForm } from 'react-hook-form';
import { apiLogin, apiRegister } from '~/api/auth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAppStore } from '~/store/useAppStore';
import { useUserStore } from '~/store/useUserStore';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import auth from '~/utils/firebaseConfig';
import OtpVerifier from './OtpVerifier';
import { twMerge } from 'tailwind-merge';
import { data } from 'autoprefixer';



const Auth = () => {

  const [variant, setVariant] = useState('LOGIN');
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setModal } = useAppStore();
  const { token, setToken, roles } = useUserStore();
  const [isShowConfirmOTP, setIsShowConfirmOTP] = useState(false)

  useEffect(() => {
    reset()
  }, [variant])

  const handleCaptchaVerify = () => {
    if (!window.recaptchaVerify) {
      window.recaptchaVerify = new RecaptchaVerifier(
        auth,
        'recaptcha-verifier',
        {
          'size': 'invisible',
          callback: (response) => { },
          'expired-callback': (response) => { }
        }
      );
    }
  }

  const handleSendOTP = (phone) => {
    setIsLoading(true)
    handleCaptchaVerify();
    const verifier = window.recaptchaVerify
    const formatPhone = '+84' + phone.slice(1);
    signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        toast.success("Sented OTP to your phone. ")
        setIsLoading(false)
        window.confirmationResult = result
        setIsShowConfirmOTP(true)
      }).catch((e) => {
        setIsLoading(false)
        toast.error("Can't verify your phone number")
      })
  }


  const handleOnSubmit = async (data) => {
    if (variant === "REGISTER") {
      if (data?.roleCode !== 'CUSTOMER') {
        handleSendOTP(data.phone);
      }

      console.log(data);

    } else {
      const { name, role, ...payload } = data
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

  const handleRegister = async (data) => {
    console.log(data);
    const respone = await apiRegister(data);
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
  }

  const callBackSuccess = () => {
    setIsShowConfirmOTP(false);
  }

  return (
    <>
      <div onClick={e => e.stopPropagation()}
        className={twMerge(clsx('bg-white relative text-lg rounded-md px-6 w-[500px]  py-8 flex flex-col items-center gap-6 inset-0'))}>
        {isShowConfirmOTP && <div className='absolute h-[300px] w-[600px] bg-inherit rounded-md z-[121]'>
          <OtpVerifier phone={data.phone} callBackRegister={handleSubmit(handleRegister)} callBackSuccess={callBackSuccess} />
        </div>}
        <div id='recaptcha-verifier'></div>
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
              options={roles?.filter(el => el.code !== "ADMIN").map(el => ({ label: el.value, value: el.code }))}
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
    </>
  )
}

export default Auth
