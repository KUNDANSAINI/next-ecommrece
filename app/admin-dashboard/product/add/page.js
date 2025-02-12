import { GetAllBrand, GetAllCategory } from "@/action";
import Product from "@/components/admin/Product";

async function AddProduct() {
    try {
        // Fetch data with error handling
        const [getBrands, getCategory] = await Promise.all([
            GetAllBrand().catch((err) => {
                console.error("Failed to fetch brands:", err);
                return { data: [] }; // Fallback to an empty array
            }),
            GetAllCategory().catch((err) => {
                console.error("Failed to fetch categories:", err);
                return { data: [] };
            }),
        ]);

        return (
            <Product getBrands={getBrands.data} getCategory={getCategory.data} />
        );
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return <div>Failed to load product data. Please try again later.</div>; // Fallback UI
    }
}

export default AddProduct;
