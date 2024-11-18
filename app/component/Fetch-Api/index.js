import axios from "axios";

// Fetch Category Data 

export async function fetchCategoryData() {
    try {        
        const response = await axios.get('http://localhost:3000/api/category', {
            headers: {
                'Cache-Control': 'no-store'
            }
        })
        if(response.data.success === true){
            return response.data.getAllCategory
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}

// Fetch SubCategory Data

export async function fetchSubCategoryData(token) {
    try {
        const response = await axios.get('http://localhost:3000/api/subcategory', {
            headers: {
                'Cache-Control': 'no-store',
                'Authorization': `Bearer ${token}`,
            }
        })
        if(response.data.success === true){
            return response.data.getAllSubCategory
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}

// Fetch Brand Data

export async function fetchBrandData() {
    try {
        const response = await axios.get('http://localhost:3000/api/brand', {
            headers: {
                'Cache-Control': 'no-store'
            }
        })
        if(response.data.success === true){
            return response.data.getAllBrand
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}

// Fetch Users Data

export async function fetchUsers(token) {
    try {
        const response = await axios.get('http://localhost:3000/api/register', {
            headers: {
                'Cache-Control': 'no-store',
                'Authorization': `Bearer ${token}`,
            }
        })        
        if(response.data.success === true){
            return response.data.getAllUser
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}

// Fetch Product Data

export async function fetchProduct() {
    try {
        const response = await axios.get('http://localhost:3000/api/product', {
            headers: {
                'Cache-Control': 'no-store'
            }
        })        
        if(response.data.success === true){
            return response.data.getAllProduct
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}

// Fetch Single Product Data

export async function fetchSinglrProduct(id,token) {
    try {        
        const response = await axios.get(`http://localhost:3000/api/product/${id}`, {
            headers: {
                'Cache-Control': 'no-store',
                'Authorization': `Bearer ${token}`,
            }
        })        
        if(response.data.success === true){
            return response.data.fetchSingleRecord[0]
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}

// Fetch Single User 

export async function fetchSingleUser(id,token){
    try {        
        const response = await axios.get(`http://localhost:3000/api/register/${id}`, {
            headers: {
                'Cache-Control': 'no-store',
                'Authorization': `Bearer ${token}`,
            }
        })        
        if(response.data.success === true){
            return response.data.getSingleUser
        }else{
            console.log(response.data.message)
        }        
    } catch (error) {
        console.log(error)
    }
}