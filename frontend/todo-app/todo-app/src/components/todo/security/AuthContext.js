import {createContext, useContext, useState} from "react";
import {executeJwtAuthenticationService} from "../api/AuthenticationApiService";
import {apiClient} from "../api/ApiClient";

export const AuthContext =  createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider( {children} ){

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

            //WITHOUT AUTHORIZATION
    // function login(username, password){
    //     if(username==="user" && password==="password"){
    //         setUsername(username)
    //         setAuthenticated(true)
    //         return true
    //     }
    //     else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    //BASIC AUTHORIZATION
    // async function login(username, password) {
    //
    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )
    //
    //     try {
    //         const response = await executeBasicAuthenticationService(baToken)
    //
    //         if (200 == response.status) {
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)
    //
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log("interscepting + adding token")
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )
    //
    //             return true
    //         } else {
    //             loggout()
    //             return false
    //         }
    //     }
    //     catch (error){
    //         loggout()
    //         return false
    //     }
    // }

            //JWT AUTHORIZATION
    async function login(username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)

            if (response.status == 200) {
                const jwtToken = "Bearer "+ response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log("interscepting + adding token")
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            } else {
                loggout()
                return false
            }
        }
        catch (error){
            loggout()
            return false
        }
    }


    function loggout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, loggout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}


