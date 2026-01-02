import React from 'react'

const FormHeader = ({ title }) => {
    return (
        <div className='bg-primary-500 px-10 py-2 rounded-b-[40px] mb-5'>
            <h3 className='text-white text-xl font-bold text-center'>{ title }</h3>
        </div>
    )
}

export default FormHeader