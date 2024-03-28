import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSlidebar from '~/components/sidebars/AdminSlidebar'

const AdminLayout = () => {
  return (
    <main className='grid grid-cols-12'>
      <div className='col-span-2  bg-main-600 text-white max-h-screen overflow-y-auto'>
        <AdminSlidebar/>
      </div>
      <div className='col-span-10'>
        <Outlet/>
      </div>
    </main>
  )
}

export default AdminLayout
