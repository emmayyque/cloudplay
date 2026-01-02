import React from 'react'

const Alert = ({ response }) => {
    return (
        <div className='z-100 fixed top-7 right-8'>
            <span 
                className={ `text-sm text-white
                    ${ 
                        response.error ? "bg-red-600" :
                        response.message && "bg-green-500"
                    } 
                    px-5 py-2 rounded-lg` 
                }
            >
                { response.message && response.message  }
                { response.error && response.error  }
            </span>
        </div>
    )
}

export default Alert