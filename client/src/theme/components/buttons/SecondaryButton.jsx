import React from 'react'
import { Link } from 'react-router'

const SecondaryButton = ({ text, icon, redirect }) => {
    return (
        <Link 
            to={ redirect }
            className={ "flex items-center justify-center w-max text-primary-500 bg-transparent px-5 py-1.5 rounded-[13px] border-2 border-primary-500 drop-shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.20)] hover:bg-primary-500 hover:text-white duration-300" }
        >
            { 
                icon && 
                <span
                >
                    { icon }
                </span>  
            }
            { 
                text &&
                <span
                    className='font-medium'
                >
                    { text }
                </span> 
            }
        </Link>
    )
}

export default SecondaryButton