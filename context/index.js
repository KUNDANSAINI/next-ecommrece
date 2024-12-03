'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null)


export default function GlobalState({ children }) {
    const [isLogin, setIsLogin] = useState(null)
    const [user, setUser] = useState(null)
    const [userID, setUserID] = useState(null)
    
    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            setIsLogin(true)
            const userData = JSON.parse(localStorage.getItem("user")) || {}
            setUser(userData.role)
        } else {
            setIsLogin(false)
        }
    }, [Cookies])

    useEffect(()=>{
        if(isLogin === true){
            const userData = JSON.parse(localStorage.getItem("user")) || {}
            const id = userData.id
            setUserID(id)
        }
    },[isLogin])


    return (
        <GlobalContext.Provider value={{ isLogin, setIsLogin, user, setUser, userID }}>{children}</GlobalContext.Provider>
    )
}