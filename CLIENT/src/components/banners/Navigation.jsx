import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '~/assets/Logo-HapplyHome.png'
import { Button, Auth } from '../index'
import { clientNavigations } from '~/navigation/ClientNavigation'
import clsx from 'clsx'
import withRouter from '~/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useUserStore } from '~/store/useUserStore'
import { useAppStore } from '~/store/useAppStore'
import { useTranslation } from 'react-i18next'


const Navigation = ({ location }) => {

  const { current } = useUserStore();

  const { setModal } = useAppStore();

  // const { t } = useTranslation();

  const { t, i18n } = useTranslation()

  const [currentLanguage, setCurrentLanguage] = useState('en')

  return (
    <div className={twMerge(clsx('h-[85px] bg-transparent flex items-center justify-between fixed w-full z-50 top-[85px] px-[100px] py-[26px]',
      location.pathname !== '/' && 'bg-main-100'
    ))}>
      <Link to={'/'}>
        <img src={logo} alt="logo" className='w-[220px] h-[90px] object-contain' />
      </Link>
      <div className={clsx('flex items-center text-main-100 gap-6',
        location.pathname === '/' ? 'text-main-500' : 'text-gray-700'
      )}>
        {clientNavigations.map(elemnt => (
          <NavLink className={({ isActive }) => clsx(isActive && 'font-medium',
            location.pathname === '/' ? 'text-main-600' : 'text-main-600'
          )} key={elemnt.id} to={elemnt.path} >
            {t(elemnt.text)}
          </NavLink>
        ))}
        {!current ?
          <Button
            children={"Sign In"}
            className={twMerge(clsx(location.pathname === '/' && 'text-main-700 bg-transparent border border-main-500'))}
            handleOnclick={() => setModal(true, <Auth />)} // hàm set content modal cho useAppStore();
          >
          </Button>
          :
          <Button children={"Add listing"} className={twMerge(clsx(location.pathname === '/' && 'bg-transparent border text-main-500 border-main-500'))} >
          </Button>
        }
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            setCurrentLanguage(currentLanguage === "en" ? "vi" : "en")
            i18n.changeLanguage(currentLanguage === "en" ? "vi" : "en")
          }}
        >
          Change language EN - VI
        </button>


      </div>
    </div>
  )
}

export default withRouter(Navigation) 