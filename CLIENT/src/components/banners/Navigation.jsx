import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import  logo  from '~/assets/logo.svg'
import { Button, Login } from '../index'
import { navigations } from '~/utils/contants'
import clsx from 'clsx'
import withRouter from '~/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useUserStore } from '~/store/useUserStore'
import { useAppStore } from '~/store/useAppStore'

const Navigation = ({location}) => {

  const { token } = useUserStore();

  const { setModal } = useAppStore();

  return (
    <div className={twMerge(clsx('h-[85px] bg-transparent flex items-center justify-between fixed w-full z-50 top-[85px] px-[100px] py-[26px]',
      location.pathname !== '/' && 'bg-main-50'
    ))}>
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-[220px] object-contain' />
        </Link>
        <div className={clsx('flex items-center text-main-100 gap-6', 
          location.pathname === '/' ? 'text-main-100' : 'text-gray-700'
        )}>
          {navigations.map(elemnt => (
            <NavLink className={({isActive}) => clsx(isActive && 'font-medium',
              location.pathname === '/' ? 'white' : 'text-main-600'
            )  } key={elemnt.id} to={elemnt.path} >
              {elemnt.text}
            </NavLink>
          ))}
          {!token ?
          <Button  
          children={"Sign In"} 
          className={twMerge(clsx( location.pathname === '/' && 'bg-transparent border border-main-100'))}
          handleOnclick={() => setModal(true, <Login/>)} // hàm set content modal cho useAppStore();
          >
          </Button>
          :
          <Button children={"Add listing"} className={twMerge(clsx( location.pathname === '/' && 'bg-transparent border border-main-100'))} >
          </Button>
           }

        </div>
    </div>
  )
}

export default withRouter(Navigation) 