import clsx from 'clsx'
import React from 'react'
import { FaArrowLeft, FaArrowRight, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'
import { ImArrowLeft } from 'react-icons/im'
import { twMerge } from 'tailwind-merge'
import { usePagination } from '~/hooks/usePagination'

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];



    return (
        <>
            <ul
                className='flex text-3xl text-main-600 gap-5 items-center justify-center my-5'
            >
                {/* Left navigation arrow */}
                <li
                    className={twMerge(clsx('border-[2px] cursor-pointer text-main-50 hover:bg-main-700 h-[88px] bg-main-500  px-5 py-6 w-[80px] text-center rounded-md', currentPage == 1 && 'bg-main-100  cursor-not-allowed hover:bg-main-100 disabled'))}
                    onClick={currentPage !== 1 ? onPrevious : undefined}
                >
                    <div>
                        <FaArrowLeft />
                    </div>
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                        return <li key={index} className="">&#8230;</li>;
                    }

                    return (
                        <li
                            key={index}
                            className={twMerge(clsx(' border-[2px]  cursor-pointer hover:bg-main-200 bg-main-50  px-5 py-6 w-[80px] text-center rounded-md', pageNumber === currentPage && 'bg-main-600 hover:bg-main-600 text-main-50'))}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    className={twMerge(clsx('border-[2px] cursor-pointer text-main-50 hover:bg-main-700 h-[88px] bg-main-500  px-5 py-6 w-[80px] text-center rounded-md', currentPage === paginationRange[paginationRange.length - 1] && 'bg-main-100  cursor-not-allowed hover:bg-main-100 disabled'))}
                    onClick={currentPage !== paginationRange[paginationRange.length - 1] ? onNext : undefined }
                >
                    <div>
                        <FaArrowRight />
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Pagination
