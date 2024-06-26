import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { Button } from '..';
import { toast } from 'react-toastify'

const OtpVerifier = ({phone, callBackRegister,callBackSuccess }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleConfirmOTP = () => {
    setIsLoading(true);
    window.confirmationResult.confirm(otp).then((result) => {
      setIsLoading(false)
      toast.success("Xác thực thành công")
      callBackSuccess()
      callBackRegister()
    }).catch((e) => {
      setIsLoading(false)
      toast.error("OTP không chính xác")
    })
  }

  return (
    <div className='p-4 flex items-center justify-center h-full flex-col gap-12'>
      <span className='flex flex-col items-center'>
        <span>{t(`We sent OTP to your phone number`)}</span>
        <span>{t(` Please check your phone.`)}</span>
      </span>
      <OtpInput
        inputStyle={"h-16 importantWith4 border rounded-md outline-none inline-block mx-1 border-blue-500"}
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus={true}
      />
      <div className='flex items-center justify-center gap-5'>
        <Button handleOnclick={handleConfirmOTP} disabled={isLoading}>
          Confirm OTP
        </Button>

        <Button handleOnclick={() => setOtp('')} className={'bg-yellow-700'}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default OtpVerifier
