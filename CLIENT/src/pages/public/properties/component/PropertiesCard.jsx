import {useEffect} from "react";
import PropTypes from 'prop-types'
import {moneyFormat} from "~/utils/function.jsx";

const PropertiesCard = ({ properties }) => {
    useEffect(() => {
        console.log(properties)
    }, [properties]);
  return (
    <div className='border rounded-md col-span-1'>
        <img className='w-full h-[240px] rounded-t-md object-cover' src={properties?.featureImages} alt=""/>
        <div className='p-4'>
            <h1 className='text-lg uppercase '>{properties?.name}</h1>
            <span className='text-lg text-main-500 font-bold'>
                {`${moneyFormat(properties?.price, 'vi-VN', 'vnd')}`}
            </span>
        </div>
    </div>
  )
}


export default PropertiesCard

PropertiesCard.propTypes = {
    properties : PropTypes.object.isRequired
}

