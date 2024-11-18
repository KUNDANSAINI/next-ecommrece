import ProductDetailsPage from "@/app/component/admin/Product/ProductID";
import { fetchBrandData, fetchCategoryData, fetchSinglrProduct, fetchSubCategoryData } from "@/app/component/Fetch-Api";
import { cookies } from "next/headers";

async function ProductDetails({params}) {
    const { id } = params
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const getSingleProduct = await fetchSinglrProduct(id,token)
    const getBrands = await fetchBrandData(token)
    const getSubCategory = await fetchSubCategoryData(token)
    const getCategory = await fetchCategoryData(token)
    
    return ( 
        <>
            <ProductDetailsPage getCategory={getCategory} getSubCategory={getSubCategory} getBrands={getBrands} getSingleProduct={getSingleProduct} id={id}/>
        </>
     );
}

export default ProductDetails;