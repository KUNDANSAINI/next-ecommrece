import ProductPage from "@/app/component/admin/Product";
import { fetchBrandData, fetchCategoryData, fetchProduct, fetchSubCategoryData } from "@/app/component/Fetch-Api";

async function Product() {
    const getProduct = await fetchProduct()
    const getBrands = await fetchBrandData()
    const getSubCategory = await fetchSubCategoryData()
    const getCategory = await fetchCategoryData()

    return (
        <>
            <ProductPage getCategory={getCategory} getSubCategory={getSubCategory} getBrands={getBrands} getProduct={getProduct} />
        </>
     );
}

export default Product;