import PropTypes from 'prop-types';


const EntryProperties = ({icon, value}) => {
    return (
        <>
             <span className='flex gap-1 items-center text-gray-500'>
                    <span>{icon}</span>
                    <span>{value}</span>
                </span>
        </>
    );
};

EntryProperties.propTypes = {
    icon : PropTypes.object.isRequired,
    value : PropTypes.string.isRequired
};

export default EntryProperties;