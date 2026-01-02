import React, { useContext, useEffect, useState } from 'react'
import FormField from '../form/FormField'
import PrimaryButton from '../buttons/PrimaryButton'
import Alert from '../Alert'
import { getRelativeTime } from '../../../utils/helper'
import { FaXmark } from 'react-icons/fa6'
import UserContext from '../../../context/user/UserContext'
import AxiosInstance from '../../../services/AxiosInstance'

const CommentItem = ({ comment }) => {
    return (
        <div className='p-4 my-4 bg-white rounded-md drop-shadow-xl'>
            <div className='flex items-start justify-between'>
                <div className='flex items-end justify-start gap-2'>
                    <div className='h-13 w-13 rounded-full overflow-hidden'>
                        <img 
                            src={ "https://img.freepik.com/free-photo/portrait-handsome-young-man-with-arms-crossed-holding-white-headphone-around-his-neck_23-2148096439.jpg" } 
                            alt={ comment.consumer.fullName } 
                            className='h-full w-full object-cover'
                        />
                    </div>
                    <h2 className='text-primary-500 text-lg font-medium'>{ comment.consumer.fullName }</h2>
                </div>
                <span className='text-sm text-secondary-500/70'>{ getRelativeTime(comment.createdAt) }</span>
            </div>
            <p className='text-secondary-500 mt-5'>{ comment.comment }</p>
        </div>
    )
}

const CommentSection = ({ video, isOpened, setResponse, triggerCommentSection }) => {

    const initValues = { comment: "" }
    const [ formValues, setFormValues ] = useState({ ...initValues })
    const [ formErrors, setFormErrors ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isSubmit, setIsSubmit ] = useState(false)
    const { user } = useContext(UserContext)

    const inputHandler = (e) => {
        const { name, value } = e.target
        setFormErrors(validate({ ...formValues, [name]: value }))
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const submissionHandler = (e) => {
        if (e) e.preventDefault()
        setIsSubmit(true)
        setFormErrors(validate(formValues))
    }

    const validate = (values) => {
        const errors = {}

        if (!values.comment) errors.comment = "Comment cannot be blank"

        return errors
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) commentHandler()
        setIsSubmit(false)
    }, [ formErrors ])

    const commentHandler = async (e) =>  {
        setIsLoading(true)
        try {
            const resp = await AxiosInstance.put(`/api/video/comment/${ video._id }`, formValues)
            setResponse({ message: "Commented Successfully" })
            setFormValues({ ...initValues })
        } catch (err) {
            setResponse({ error: "Error in Commenting " + err })
        } finally {
            setIsSubmit(false)
            setIsLoading(false)
            setTimeout(() => {
                setResponse({})
            }, 3000)
        }
    }

    return (
        <section 
            className={
                `fixed z-60 top-0 right-0 md:static md:block
                ${ isOpened ? `p-5 md:p-8 w-full translate-x-0` : `py-5 md:py-8 translate-x-full` }
                bg-white/80 h-screen rounded-l-[40px] drop-shadow-2xl backdrop-blur-2xl duration-300`
            }
        >
            <div 
                className='w-max flex items-end justify-end text-2xl text-primary-500 cursor-pointer'
                onClick={ triggerCommentSection }
            >
                <FaXmark className='pointer-events-none' />
            </div>
            {
                user.role == 3 &&
                <form className='w-full flex flex-col items-end justify-start gap-5 mb-4'>
                    <FormField 
                        name={ "comment" }
                        id={ "comment" }
                        label={ "Comment" }
                        placeholder={ "Leave a comment..." }
                        fieldType={ "textarea" }
                        value={ formValues.comment }
                        error={ formErrors.comment }
                        handler={ inputHandler }
                    />
                    <PrimaryButton 
                        isLoading={ isLoading }
                        text={ `${ isLoading ? 'Submitting' : 'Submit' }` }
                        handler={ !isLoading && submissionHandler }
                    />
                </form>
            }
            <div className='w-full h-full overflow-scroll scroll-auto'>
                {
                    video.comments && video.comments.length > 0 ? [...video.comments].reverse().map(( item, index ) => (
                        <CommentItem comment={ item } key={ index } />
                    )) : 
                    <p className='text-secondary-500 text-center mt-4'>No comments yet ...</p>
                }
            </div>
        </section>
    )
}

export default CommentSection