'use client'

import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GlobalContext = createContext(null)


export default function GlobalState({children}){
    const [isLogin,setIsLogin] = useState(null)
    const [user,setUser] = useState(null)
    const [getBrands, setGetBrands] = useState([])
    const [getCategory, setGetCategory] = useState([])
    const [getSubCategory, setGetSubCategory] = useState([])

    useEffect(()=>{
        if(Cookies.get("token") !== undefined){
            setIsLogin(true)
            const userData = JSON.parse(localStorage.getItem("user")) || {}
            setUser(userData.role)
        }else{
           setIsLogin(false)
        }
    },[Cookies])

    useEffect(() => {
        async function fetchBrandData() {
            try {
                const response = await axios.get('http://localhost:3000/api/brand',{
                    headers: {
                        'Cache-Control': 'no-store',
                    }
                })
                if (response.data.success === true) {
                    setGetBrands(response.data.getAllBrand)
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error("Something Went Wrong. Please Try Again!")
            }
        }

        fetchBrandData()
    }, [])

    useEffect(() => {

        async function fetchCategoryData() {
            try {
                const response = await axios.get('http://localhost:3000/api/category',{
                    headers: {
                        'Cache-Control': 'no-store',
                    }
                })
                if (response.data.success === true) {
                    setGetCategory(response.data.getAllCategory)
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error("Something Went Wrong. Please Try Again!")
            }
        }

        fetchCategoryData()
    }, [])
    

    useEffect(() => {

        async function fetchSubCategoryData() {
            try {
                const response = await axios.get('http://localhost:3000/api/subcategory',{
                    headers: {
                        'Cache-Control': 'no-store',
                    }
                })
                if (response.data.success === true) {
                    setGetSubCategory(response.data.getAllSubCategory)
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error("Something Went Wrong. Please Try Again!")
            }
        }

        fetchSubCategoryData()
    }, [])    

    return (
        <GlobalContext.Provider value={{isLogin,setIsLogin,user,setUser,getBrands,setGetBrands,getCategory,setGetCategory,getSubCategory,setGetSubCategory}}>{children}</GlobalContext.Provider>
    )
}