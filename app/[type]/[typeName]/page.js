import { GetAllBrand, GetAllCategory, GetAllProduct } from "@/action";
import TypeNamePage from "@/components/includes/TypeNamePage";

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
    const { type, typeName } = params;

    return {
        title: type === "Shop"
            ? `Trendy - Discover the Latest ${typeName} Collection`
            : `Trendy - Shop Premium ${typeName} for ${type}`,

        description: type === "Shop"
            ? `Explore a wide range of top-quality ${typeName} at Trendy. Discover the latest styles and unbeatable deals, all in one place!`
            : `Upgrade your wardrobe with the latest ${typeName} in ${type}. Shop premium quality and enjoy the best prices today!`
    };

}


async function TypeName({ params }) {
    const { type, typeName } = params;

    try {
        // Fetch all data concurrently
        const [getProduct, getBrands, getCategory] = await Promise.all([
            GetAllProduct(),
            GetAllBrand(),
            GetAllCategory(),
        ]);

        return (
            <>
                <TypeNamePage
                    getProduct={getProduct.data}
                    getBrand={getBrands.data}
                    getCategory={getCategory.data}
                    type={type}
                    typeName={typeName}
                />
            </>
        );
    } catch (error) {
        console.error("Error fetching data:", error);

        return (
            <div>
                <h1>Error Loading Page</h1>
                <p>There was an issue fetching the required data. Please try again later.</p>
            </div>
        );
    }
}

export default TypeName;
