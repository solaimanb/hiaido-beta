import React from 'react'

const OrDevider = ({ className }) => {
    return (
        <div className={`text-white text-center relative py-2 ${className}`}>
            <span className='z-10 relative font-bold p-3'>OR</span>
            <hr className='z-0 absolute w-[47%] left-0 top-[50%]' />
            <hr className='z-0 absolute w-[47%] right-0 top-[50%]' />
        </div>
    )
}

export default OrDevider