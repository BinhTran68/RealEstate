import React from 'react'
import PropertiesCard from '~/pages/public/properties/component/PropertiesCard'

const Properties = () => {
  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <img
          src="public/bannerProperties.png"
          alt=""
          className='w-full h-[230px] object-cover object-center'
        />
         <div class="absolute inset-0 text-white flex flex-col justify-center items-center bg-black bg-opacity-30">
            <h1 className='text-[48px] font-medium'>PROPERTIES</h1>
            <div>BreadCrumb</div>
         </div>
      </div>
      {/* Content */}
      <div className='w-main mx-auto my-20'>
          <div>
            sort by
          </div>
          <div className='w-full grid grid-cols-3 gap-4'>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            <PropertiesCard/>
            
            
          </div>
      </div>
    </div>
  )
}

export default Properties
