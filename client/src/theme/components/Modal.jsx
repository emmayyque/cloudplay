import React from 'react'

const Modal = ({ child }) => {
    return (
        <section
            className={
                `fixed z-80 h-screen
                ${ !child && '-translate-y-full' }
                w-full bg-white/50 backdrop-blur-xl duration-300
                flex items-center justify-center`
            }
        >
            <div className='w-max bg-white rounded-2xl px-5 pb-5 md:px-7 md:pb-7'>
                { child }
            </div>
        </section>
    )
}

export default Modal