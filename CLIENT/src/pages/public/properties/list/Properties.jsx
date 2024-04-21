import PropertiesCard from '~/pages/public/properties/component/PropertiesCard'
import { useEffect, useState } from "react";
import { apiGetProperties } from "~/api/properties.jsx";
import { LIMIT } from "~/utils/contants.jsx";
import { Dropdown } from "antd";
import { BiCaretDown } from "react-icons/bi";
import { Button } from "~/components/index.jsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Pagination from '~/components/pagination/Pagination';

const Properties = () => {
    const items = [
        {
            key: 'none',
            label: 'Sort by',
        },
        {
            key: '-createdAt',
            label: 'Lastest',
        },
        {
            key: 'createdAt',
            label: 'Oldest',
        },
        {
            key: 'name',
            label: 'A -> Z',
        },
        {
            key: '-name',
            label: 'Z -> A ',
        },

    ];

    const [propertiesData, setPropertiesData] = useState();
    const [labelSelectSort, setLabelSelectSort] = useState({ key: '1', label: 'Sort' });
    const [modeProperties, setModeProperties] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [pageSize, setPageSize] = useState(LIMIT)

    const fetchProperties = async () => {
        const response = await apiGetProperties({ limit: LIMIT, page: currentPage })
        if (response.success) {
            setPropertiesData(response);
            setTotalCount(response.properties.totalCount)
        }
    }

    const handleDropdownItemClick = (value) => {
        const selectedItem = items.find((el) => el.key === value.key);
        if (selectedItem) {
            setLabelSelectSort(selectedItem);
        }
    };  


    useEffect(() => {
        fetchProperties()
    }, [currentPage]);

    return (
        <div className='w-full'>
            <div className='relative w-full'>
                <img
                    src="public/bannerProperties.png"
                    alt=""
                    className='w-full h-[230px] object-cover object-center'
                />
                <div
                    className="absolute inset-0 text-white flex flex-col justify-center items-center bg-black bg-opacity-30">
                    <h1 className='text-[48px] font-medium'>PROPERTIES</h1>
                    <div>BreadCrumb</div>
                </div>
            </div>
            {/* Content */}
            <div className='w-main mx-auto my-20'>
                <div className='my-2 flex justify-between items-center text-sm'>
                    <div className=''>
                        <Dropdown
                            menu={{
                                items,
                                onClick: handleDropdownItemClick,
                                selectable: true,
                                defaultSelectedKeys: ['1'],
                            }}
                        >
                            <div className='flex gap-2 items-center border-b font-bold border-main-600 text-main-500'>
                                {labelSelectSort.label}
                                <BiCaretDown />
                            </div>
                        </Dropdown>
                    </div>
                    <div className='flex items-center justify-center '>
                        <Button
                            handleOnclick={() => setModeProperties('ALL')}
                            className={twMerge(clsx('whitespace-nowrap bg-transparent border-none text-main-500 font-medium',
                                modeProperties === 'ALL' && 'font-bold'
                            ))}>
                            All Properties
                        </Button>
                        <Button
                            handleOnclick={() => setModeProperties('RENT')}
                            className={twMerge(clsx('whitespace-nowrap bg-transparent border-none text-main-500 font-medium',
                                modeProperties === 'RENT' && 'font-bold'
                            ))}>
                            For Rent
                        </Button>
                        <Button
                            handleOnclick={() => setModeProperties('SALE')}
                            className={twMerge(clsx('whitespace-nowrap bg-transparent border-none text-main-500 font-medium',
                                modeProperties === 'SALE' && 'font-bold'
                            ))}>
                            For Sale
                        </Button>

                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        propertiesData && propertiesData?.properties?.data?.rows.map((p) => (
                            <PropertiesCard key={p.id} properties={p} />
                        ))
                    }
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={page =>setCurrentPage(page) }
                />
            </div>
        </div>
    )
}

export default Properties
