'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/env";
import Loading from "@/app/Loading";
import Product from "@/app/component/Product";

function ProductDetails() {
    const params = useParams()
    const { id } = params
    const [getSingleProduct, setGetSingleProduct] = useState(null)
    const [loading,setLoading] = useState(false)    

    useEffect(() => {
        if (id) {
            fetchSingleProduct(id)
        }
    }, [id])

    async function fetchSingleProduct(id) {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/product/${id}`, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            })
            if (response.data.success === true) {
                setGetSingleProduct(response.data.fetchSingleRecord)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
            loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loading />
                </div>
            ) : (
                <Product data={getSingleProduct} id={id} />
            )
    );
}

export default ProductDetails;