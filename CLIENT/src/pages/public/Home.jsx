import React from 'react'
import imgBanner from '~/assets/nhaDepBaner.jpg'
import Search from '~/components/search/Search'

const Home = () => {
  return (
    <div className='bg-white w-full ' >
      <div className='w-full h-fit relative'>
        <img src={imgBanner} alt="" className='w-full h-[690px] object-cover' />
        <div className='absolute inset-0 flex flex-col gap-5 items-center justify-center pt-12'>
          <h1 className=' text-main-800 text-5xl' >Find Your Dream Home</h1>
          <p className=' text-main-800 text-lg  flex flex-col gap-1 items-center justify-center'>
            <span>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae;
            </span>
            <span className=' text-lg'>
              Proin sodales ultrices nulla blandit
              volutpat.</span>
          </p>
        </div>
      </div>
      <div>
        <Search/>
      </div>
      <div className='w-main mx-auto '>
        Content
      </div>
    </div>
  )
}

export default Home
