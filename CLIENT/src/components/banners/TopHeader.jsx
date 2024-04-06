import clsx from 'clsx';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import withRouter from '~/hocs/withRouter';
import { showOptionsUser } from '~/navigation/ShowOptionUser';
import { useUserStore } from '~/store/useUserStore';

const TopHeader = ({ location }) => {

    const { t, i18n } = useTranslation()
    const optionBoxUsers = useRef();
    const { current, Logout } = useUserStore()
    const [currentLanguage, setCurrentLanguage] = useState('en')
    const [isShowOptions, setIsShowOptions] = useState(false)

    useEffect(() => {
        const handlerOnclick = (e) => {
            if (optionBoxUsers.current.contains(e.target)) {
                setIsShowOptions(true)
            }else {
                setIsShowOptions(false)
            }
        }
        window.addEventListener('click', handlerOnclick)
        return () => {
            window.removeEventListener('click', handlerOnclick)
        }
    }, [])


    console.log(current);
    return (
        <div className={twMerge(
            clsx(
                'h-[85px] text-white border-b  border-main-700 bg-transparent fixed top-0 z-50 flex items-center justify-between w-full px-[100px] py-[26px]',
                location.pathname != '/' && 'bg-main-700'
            )
        )}>
            <div className='flex items-center gap-2'>
                <AiOutlineMail />
                <span>
                    <span> Email us at : </span>
                    <span className='text-main-400'> example@gmail.com </span>
                </span>
            </div>
            <div className='flex items-center gap-6' >
                <div className={twMerge(clsx('flex items-center gap-6 text-gray-300', location.pathname === '/' && 'text-main-700'))} >
                    <FaFacebook />
                    <FaInstagram />
                    <FaYoutube size={18} />
                </div>
                {current && <div ref={optionBoxUsers} onClick={() => setIsShowOptions(!isShowOptions)} className={twMerge(clsx('relative flex items-center cursor-pointer select-none hover:bg-overlay-50 p-4  gap-6 border-l pl-3 text-gray-300', location.pathname === '/' && 'text-main-700'))} >
                    <div className='flex flex-col'>
                        <span>{current?.name}</span>
                    </div>
                    <img src={current?.avatar || "/user.svg"} alt="avatar" className='w-8 h-8 object-cover rounded-full' />
                    {/* Set this div to varible optionBoxUsers  */}
                    {isShowOptions && <div className='absolute right-0 top-full z-20 text-black bg-white drop-shadow-sm flex flex-col py-2 border'>
                        {showOptionsUser.map((element) => (
                            <Fragment key={element.id}>
                                {current?.userRoles?.some(role => role.roleCode === element.cole) &&
                                    <Link className='px-6 py-2 hover:bg-gray-100' to={element.path}>{element.name}</Link>
                                }
                            </Fragment>
                        ))}
                        <span onClick={() => Logout()} className='px-6 py-2 hover:bg-gray-100 cursor-pointer'>Logout</span>
                    </div>}
                </div>
                }
                {/* <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                        setCurrentLanguage(currentLanguage === "en" ? "vi" : "en")
                        i18n.changeLanguage(currentLanguage === "en" ? "vi" : "en")
                    }}
                >
                    {currentLanguage === "en" ? <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#c93728"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#ff5" d="M18.008 16.366L21.257 14.006 17.241 14.006 16 10.186 14.759 14.006 10.743 14.006 13.992 16.366 12.751 20.186 16 17.825 19.249 20.186 18.008 16.366z"></path></svg>
                    </span> : <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                    </span>}
                </button> */}
            </div>



        </div>
    )
}

export default withRouter(TopHeader)
