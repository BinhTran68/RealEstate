import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '~/assets/Logo-HapplyHome.png'
import { adminNavigations } from '~/navigation/AdminNavigation'
import { FaAngleRight } from "react-icons/fa"
import { FaAngleDown } from "react-icons/fa";

const AdminSlidebar = () => {

  const [activeTabs, setActiveTabs] = useState([])

  const hanleActiveTabs = (tabId) => {
    if (activeTabs.some(el => el === tabId)) {
      setActiveTabs(prev => prev.filter((el) => el !== tabId))
    } else {
      setActiveTabs((prev) => [...prev, tabId])
    }
  }

  return (
    <div className='h-screen  w-full'>
      <div className='w-full flex flex-col p-5 justify-center items-center'>
        <img src={logo} alt="logo" className='w-3/5 object-contain' />
        <small className='text-red-300 italic '>Admin workspace</small>
      </div>
      <div className='mt-6'>
        {adminNavigations.map(el => <Fragment key={el.id}>
          {/* isActive of NavLink can  */}
          {el.type === 'SINGLE' &&
            <NavLink to={el.path} className={({ isActive }) => clsx('flex items-center gap-2 w-full px-4 py-3 hover:border-r-4 border-orange-600 hover:bg-main-800', isActive && 'border-r-4  bg-main-800')}>
              <span className='text-2xl'>{el.icon}</span>
              <span className='select-none' >{el.name}</span>
            </NavLink>
          }
          {el.type === 'PARENT' &&
            <>
              <div onClick={() => hanleActiveTabs(el.id)} className='flex items-center justify-between gap-2 px-4 py-3 cursor-pointer hover:bg-main-800'>
                <span className='flex items-center gap-2 '>
                  <span className='text-2xl'>{el.icon}</span>
                  <span className='select-none'>{el.name}</span>
                </span>
                <span>
                  {activeTabs.some(tabId => tabId === el.id) ? <FaAngleDown /> : <FaAngleRight />}
                </span>
              </div>
              {activeTabs.some(tab => tabId => tabId === el.id) && <div className='fade-in-top'>
                {el.subs.map(subMenu =>
                  <NavLink to={subMenu.path} key={subMenu.id} className={({ isActive }) => clsx('flex items-center gap-2 w-full px-4 py-3  hover:border-r-4 border-orange-600 hover:bg-main-800', isActive && 'border-r-4  bg-main-800')}>
                    <span className='select-none' >{subMenu.name}</span>
                  </NavLink>
               )} 
              </div>}
            </>
          }
        </Fragment>)}
      </div>

    </div>
  )
}

export default AdminSlidebar
