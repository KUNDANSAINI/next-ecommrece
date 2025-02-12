import Product from "@/components/admin/Product";
import { GetAllBrand, GetAllCategory, SingleProduct } from "@/action";

async function ProductDetails({ params }) {
    const { id } = params;

    try {
        // Fetch data in parallel
        const [getSingleProduct, getBrands, getCategory] = await Promise.all([
            SingleProduct(id).catch((err) => {
                console.error("Failed to fetch single product:", err);
                return { data: null }; // Fallback for single product
            }),
            GetAllBrand().catch((err) => {
                console.error("Failed to fetch brands:", err);
                return { data: [] }; // Fallback for brands
            }),
            GetAllCategory().catch((err) => {
                console.error("Failed to fetch categories:", err);
                return { data: [] }; // Fallback for categories
            }),
        ]);

        // Handle missing product
        if (!getSingleProduct?.data) {
            return <div>Failed to load product details. Please try again later.</div>;
        }

        return (
            <Product
                getBrands={getBrands.data}
                getCategory={getCategory.data}
                data={getSingleProduct.data}
                id={id}
            />
        );
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return <div>Failed to load product details. Please try again later.</div>;
    }
}

export default ProductDetails;
