import { GetAllBrand, GetAllCategory, GetAllProduct } from "@/action";
import ProductPage from "@/components/admin/ProductPage";

async function Product() {
    try {
        // Fetch all data in parallel for better performance
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
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return <div>Failed to load data. Please try again later.</div>; // Render fallback UI
    }
}

export default Product;
