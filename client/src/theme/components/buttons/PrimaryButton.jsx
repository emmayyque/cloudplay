import { Link } from 'react-router'

const Spinner = () => {
    return (
        <div className='flex items-center justify-center h-5 w-5 bg-linear-to-r from-white to-white/5 rounded-full animate-spin'>
            <div className='h-3.5 w-3.5 bg-primary-500/35 rounded-full' />
        </div>
    )
}

const PrimaryButton = ({ isLoading, text, icon, redirect, handler }) => {

    return (
        <Link 
            to={ redirect && redirect }
            className={ `flex items-center justify-center gap-2 w-max text-white ${ isLoading ? "bg-primary-500/35 border-primary-500/35" : "bg-primary-500 border-primary-500" } px-5 py-1.5 rounded-[13px] border-2 border-primary-500 drop-shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.20)] duration-300` }
            onClick={ handler && handler }
        >
            { isLoading && <Spinner /> }
            { 
                icon && 
                <span
                    className='pointer-events-none'
                >
                    { icon }
                </span>  
            }
            { 
                text &&
                <span
                    className='font-medium pointer-events-none'
                >
                    { text }
                </span> 
            }
        </Link>
    )
}

export default PrimaryButton