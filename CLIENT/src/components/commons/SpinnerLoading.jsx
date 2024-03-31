import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const SpinnerLoading = ({size=20}) => {
  return (
    <>
     <span className='animate-spin'><ImSpinner2 size={size} /></span>
    </>
  )
}

export default SpinnerLoading

