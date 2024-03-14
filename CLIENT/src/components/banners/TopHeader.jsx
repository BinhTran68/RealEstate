import clsx from 'clsx';
import React from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import withRouter from '~/hocs/withRouter';

const TopHeader = ({location}) => {
    return (
        <div className={twMerge(
            clsx(
                'h-[85px] text-white border-b border-main-200 bg-transparent fixed top-0 z-50 flex items-center justify-between w-full px-[100px] py-[26px]',
                location.pathname != '/'  && 'bg-main-700'
            )
        )}>
            <div className='flex items-center gap-2'>
                <AiOutlineMail />
                <span>
                    <span> Email us at : </span>
                    <span className='text-gray-300'> example@gmail.com </span>
                </span>
            </div>
            <div className='flex items-center gap-6' >
                <div className='flex items-center gap-6 text-gray-300'>
                    <FaFacebook /> 
                    <FaInstagram />
                    <FaYoutube size={18} />
                </div>
                <span className='flex items-center pl-3 border-l gap-2'>
                    <AiOutlinePhone />
                    <span>
                        1234566
                    </span>
                </span>
            </div>

        </div>
    )
}

export default withRouter(TopHeader)
