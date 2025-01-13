'use client'

import Head from 'next/head'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/env";
import { useRouter } from 'next/navigation';
import HomePage from '@/components/includes/HomePage';
import Loading from '@/components/Loading';

export default function Home() {
  const [getBrands, setGetBrands] = useState([])
  const [getCategory, setGetCategory] = useState([])
  const [getProduct, setGetProduct] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [productLoading, setProductLoading] = useState(false)
  const [brandLoading, setBrandLoading] = useState(false)
  const router = useRouter()
  

  useEffect(() => {
    fetchBrandData()
    fetchCategoryData()
    fetchProduct()
  }, [])

  // fetching Category Data 
  async function fetchCategoryData() {
    try {
      setCategoryLoading(true)
      const response = await axios.get(`${API_URL}/api/category`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      })
      if (response.data.success === true) {
        setGetCategory(response.data.getAllCategory)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setCategoryLoading(false)
    }
  }

  // fetching Brand Data 
  async function fetchBrandData() {
    try {
      setBrandLoading(true)
      const response = await axios.get(`${API_URL}/api/brand`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      })
      if (response.data.success === true) {
        setGetBrands(response.data.getAllBrand)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setBrandLoading(false)
    }
  }

  // fetching Product Data 
  async function fetchProduct() {
    try {
      setProductLoading(true)
      const response = await axios.get(`${API_URL}/api/product`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      })
      if (response.data.success === true) {
        setGetProduct(response.data.getAllProduct)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setProductLoading(false)
    }
  }

  const isLoading = productLoading || brandLoading || categoryLoading;

  return (
    <>
    <Head>
    <title>Home Page - Bazzar Pro</title>
        <meta name="description" content="This is the home page of Bazzar Pro." />
        <meta name="keywords" content="home, website, SEO" />
    </Head>
      {
        isLoading ? (
          <div className='flex justify-center items-center h-screen'>
            <Loading />
          </div>
        ) : (
          <HomePage getBrands={getBrands} getCategory={getCategory} getProduct={getProduct} />
        )
      }
    </>
  );
}