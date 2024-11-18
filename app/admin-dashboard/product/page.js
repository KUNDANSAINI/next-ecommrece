import ProductPage from "@/app/component/admin/Product";
import { fetchBrandData, fetchCategoryData, fetchProduct, fetchSubCategoryData } from "@/app/component/Fetch-Api";
import { cookies } from "next/headers";

async function Product() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const getProduct = await fetchProduct()
    const getBrands = await fetchBrandData()
    const getSubCategory = await fetchSubCategoryData(token)
    const getCategory = await fetchCategoryData()

    return (
        <>
            <ProductPage getCategory={getCategory} getSubCategory={getSubCategory} getBrands={getBrands} getProduct={getProduct} />
        </>
     );
}

export default Product;