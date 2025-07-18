import { AuthContext } from "@/hooks/useAuth"
import { Redirect, Stack } from "expo-router"
import { useContext } from "react"

const AuthLayout = ()=> {
    const {isLoggedIn} = useContext(AuthContext)

    if(isLoggedIn) return <Redirect href="/" />
    return(
        <Stack screenOptions={{headerShown:false}}/>
    )
}

export default AuthLayout