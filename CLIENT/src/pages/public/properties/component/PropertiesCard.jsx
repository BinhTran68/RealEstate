import {useEffect} from "react";
import PropTypes from 'prop-types'
import {moneyFormat} from "~/utils/function.jsx";
import {IoBedOutline} from "react-icons/io5";
import EntryProperties from "~/pages/public/properties/component/EntryProperties.jsx";
import {BiBath} from "react-icons/bi";
import {IoIosCrop} from "react-icons/io";
import {CiHeart, CiShare2} from "react-icons/ci";

const PropertiesCard = ({properties}) => {
    useEffect(() => {
        console.log(properties)
    }, [properties]);
    return (
        <div className='border rounded-md col-span-1 '>
            <img className='w-full h-[240px] rounded-t-md object-cover' src={properties?.featureImages} alt=""/>
            <div className='p-4 flex flex-col gap-2'>
                <h1 className='text-lg font-medium line-clamp-2 text-gray-700 uppercase '>{properties?.name}</h1>
                <span className='text-lg text-main-500 font-bold'>
                {`${moneyFormat(properties?.price, 'en-US', 'USD')}`}
            </span>
                <div className='flex items-center gap-3 text-sm'>
                    <EntryProperties icon={<IoBedOutline/>} value={properties.bedRoom}/>
                    <EntryProperties icon={<BiBath/>} value={properties.bathRoom}/>
                    <EntryProperties icon={<IoIosCrop/>} value={properties.propertySize}/>
                </div>
                <div className='flex items-center justify-between  gap-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <img src={properties?.property_user_posted.avatar} alt={'posted by'}
                             className='w-10 h-10 object-cover rounded-full'
                        />
                        <span>{properties?.property_user_posted.name}</span>
                        <span
                            className='rounded-sm px-4 py-1 text-xs flex items-center justify-center bg-green-500 text-white'>
                        Agent
                    </span>
                    </div>
                    <div className='flex items-center justify-center gap-2 text-xl'>
                        <CiShare2 />
                        <CiHeart />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PropertiesCard

PropertiesCard.propTypes = {
    properties: PropTypes.object.isRequired
}

