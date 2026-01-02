import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6'

const Controls = ({ mute }) => {  

    const muteToggler = () => {
        mute.setIsMuted(!mute.isMuted)
    }

    return (
        <div className='absolute top-2.5 left-2.5 flex items-center justify-between p-4' onClick={ muteToggler }>
            { mute.isMuted ? <FaVolumeXmark className='fill-white h-7 w-7 pointer-events-none' /> : <FaVolumeHigh className='fill-white h-7 w-7 pointer-events-none' /> }
        </div>
    )
}

export default Controls