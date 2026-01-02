import React, { useContext, useEffect } from 'react'
import UserContext from '../context/user/UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const { user, getUser, isLoading, isLoggedIn } = useContext(UserContext)

    useEffect(() => {
        if (!user) getUser()
    }, [])

    if (isLoading) return null

    if (!isLoading && !isLoggedIn) return null

    if (!user) return <Navigate to={ "/auth" } />

    if (user && user.role == 1 ) return <Navigate to={ "/dashboard" } />

    return children
}

export default ProtectedRoute