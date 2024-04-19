import PropertiesCard from '~/pages/public/properties/component/PropertiesCard'
import {useEffect, useState} from "react";
import {apiGetProperties} from "~/api/properties.jsx";
import {LIMIT} from "~/utils/contants.jsx";
import {Dropdown, Typography, Space} from "antd";
import {BiCaretDown} from "react-icons/bi";

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
    const [labelSelectSort, setLabelSelectSort] = useState({ key : '1' , label : 'Sort' });

    const fetchProperties = async () => {
        const response = await apiGetProperties({limit: LIMIT, page: 1})
        if (response.success) {
            setPropertiesData(response);
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
    }, []);

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
                <div className='my-4 flex justify-between items-center text-sm'>
                    <div className=''>
                        <Dropdown
                            menu={{
                                items,
                                onClick : handleDropdownItemClick,
                                selectable: true,
                                defaultSelectedKeys: ['1'],
                            }}
                        >
                            <div className='flex gap-2 items-center border-b border-main-600 text-main-500'>
                                {labelSelectSort.label}
                                <BiCaretDown/>
                            </div>
                        </Dropdown>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='w-full grid lg:grid-cols-3   gap-4'>
                    {
                        propertiesData && propertiesData?.properties?.data?.rows.map((p) => (
                            <PropertiesCard key={p.id} properties={p}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Properties
