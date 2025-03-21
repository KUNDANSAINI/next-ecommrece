import { GetAllBrand, GetAllCategory, verifyUserToken } from "@/action";
import Product from "@/components/admin/Product";
import { redirect } from "next/navigation";

async function AddProduct() {
    const { success, error, user } = await verifyUserToken()

    if (!user) {
        redirect('/login')
    }

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
    )
}

export default AddProduct;
