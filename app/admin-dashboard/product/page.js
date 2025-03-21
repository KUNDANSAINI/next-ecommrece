import { GetAllBrand, GetAllCategory, GetAllProduct, verifyUserToken } from "@/action";
import ProductPage from "@/components/admin/ProductPage";
import { redirect } from "next/navigation";

async function Product() {
    const { success, error, user } = await verifyUserToken()
    
    if(!user){
        redirect('/login')
    }

    const [getProduct, brand, category] = await Promise.all([
        GetAllProduct().catch((err) => {
            console.error("Failed to fetch products:", err);
            return { data: [] }; // Fallback to empty array
        }),
        GetAllBrand().catch((err) => {
            console.error("Failed to fetch brands:", err);
            return { data: [] };
        }),
        GetAllCategory().catch((err) => {
            console.error("Failed to fetch categories:", err);
            return { data: [] };
        }),
    ]);

    return (
        <ProductPage
            getProduct={getProduct.data}
            brand={brand.data}
            category={category.data}
        />
    );
}

export default Product;
