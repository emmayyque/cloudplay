import { useContext, useEffect, useState } from 'react'
import { FaCommentDots, FaHeart, FaPlay } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { errorHandler, formatNumber } from '../../../utils/helper'
import UserContext from '../../../context/user/UserContext'
import AxiosInstance from '../../../services/AxiosInstance'

const Meta = ({ video, setResponse, triggerCommentSection }) => {

    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [ isLiked, setIsLiked ] = useState(false)

    const likeHandler = async (e) => {
        if (e) e.preventDefault()
        try {
            const resp = await AxiosInstance.put(`/api/video/like/${ video._id }`)
            setIsLiked(true)
            setResponse({ message: "Liked Successfully" })
        } catch (err) {
            console.log(errorHandler(err))
        }
    }

    const checkIsLiked = (e) => {
        if (e) e.preventDefault()
        
        video.likes.forEach(like => {
            if (like.consumer === user._id) setIsLiked(true)
        })
        
    }

    const unlikeHandler = async (e) => {
        if (e) e.preventDefault()
        try {
            const resp = await AxiosInstance.put(`/api/video/unlike/${ video._id }`)
            setIsLiked(false)
            setResponse({ message: "Unliked Successfully" })
        } catch (err) {
            console.log(errorHandler(err))
        }
    }

    useEffect(() => {
        checkIsLiked()
    }, [])



    const creatorProfileHandler = (e) => {
        if (e) e.preventDefault()
        console.log("Its creator profile handler")
        // navigate('/creator-profile')
    }

    return (
        <div className='absolute bottom-[50px] sm:bottom-[30px] right-2.5 flex flex-col items-center justify-end gap-3 p-4'>
            <div className='h-13 w-13 bg-zinc-800 rounded-full overflow-hidden' onClick={ creatorProfileHandler }>
                <img src={ "https://img.freepik.com/free-photo/portrait-handsome-young-man-with-arms-crossed-holding-white-headphone-around-his-neck_23-2148096439.jpg" } alt="" className='h-full w-full object-cover' />
            </div>
            <button className='group' onClick={ isLiked ? unlikeHandler : likeHandler } >
                <span 
                    className={ `h-12 w-12 ${ isLiked ? 'bg-primary-500 group-hover:bg-primary-100/70' : 'bg-zinc-700 group-hover:bg-zinc-800' } rounded-full overflow-hidden flex items-center justify-center duration-300` }
                >
                    <FaHeart className='h-6 w-6 fill-white' />
                </span>
                <p className='text-white text-sm font-medium mt-2'>{ formatNumber(video.likes.length) }</p>
            </button>
            <button className='group' onClick={ triggerCommentSection } >
                <span className='h-12 w-12 bg-zinc-700 rounded-full overflow-hidden flex items-center justify-center duration-300 group-hover:bg-zinc-800'>
                    <FaCommentDots className='h-6 w-6 fill-white' />
                </span>
                <p className='text-white text-sm font-medium mt-2'>{ formatNumber(video.comments.length) }</p>
            </button>
            <button className='group' >
                <span className='h-12 w-12 bg-zinc-700 rounded-full overflow-hidden flex items-center justify-center duration-300 group-hover:bg-zinc-800'>
                    <FaPlay className='h-6 w-6 fill-white' />
                </span>
                <p className='text-white text-sm font-medium mt-2'>{ formatNumber( video.views == 0 ? 0 : video.views  ) }</p>
            </button>
        </div>
    )
}

export default Meta