import Product from "@/components/admin/Product";
import { GetAllBrand, GetAllCategory, SingleProduct, verifyUserToken } from "@/action";
import { redirect } from "next/navigation";

async function ProductDetails({ params }) {
    const { id } = params;
    const { success, error, user } = await verifyUserToken()

    if (!user) {
        redirect('/login')
    }

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
}

export default ProductDetails;
