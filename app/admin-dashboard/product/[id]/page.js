import ProductDetailsPage from "@/app/component/admin/Product/ProductID";
import { fetchBrandData, fetchCategoryData, fetchSinglrProduct, fetchSubCategoryData } from "@/app/component/Fetch-Api";

async function ProductDetails({params}) {
    const { id } = params
    const getSingleProduct = await fetchSinglrProduct(id)
    const getBrands = await fetchBrandData()
    const getSubCategory = await fetchSubCategoryData()
    const getCategory = await fetchCategoryData()
    
    return ( 
        <>
            <ProductDetailsPage getCategory={getCategory} getSubCategory={getSubCategory} getBrands={getBrands} getSingleProduct={getSingleProduct} id={id}/>
        </>
     );
}

export default ProductDetails;