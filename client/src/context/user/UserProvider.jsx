import { useState } from "react"
import UserContext from "./UserContext"
import { errorHandler } from "../../utils/helper"
import AxiosInstance from "../../services/AxiosInstance"

const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    const getUser = async () => {
        setIsLoading(true)
        try {
            const resp = await AxiosInstance.get("/api/auth/getUser")
            setUser({ ...resp.data })
            setIsLoggedIn(true)
        } catch (err) {
            console.error(errorHandler(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <UserContext.Provider 
            value={{ 
                user,
                setUser,
                getUser,
                isLoading,
                setIsLoading,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider