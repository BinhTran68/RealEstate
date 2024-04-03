import React from 'react'
import { ImSpinner2 } from "react-icons/im";

const ComponentSpinner = () => {
  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
      <span className="animate-spin text-main-500 absolute">
        <ImSpinner2  size={35} />
      </span>
    </div>
  )
}

export default ComponentSpinner
