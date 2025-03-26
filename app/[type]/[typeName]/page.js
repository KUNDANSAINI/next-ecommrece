import { GetAllBrand, GetAllCategory, GetAllProduct } from "@/action";
import TypeNamePage from "@/components/includes/TypeNamePage";
import { notFound } from "next/navigation";

const validTypes = ["Shop", "Men", "Women", "Kids"];

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
    const { type, typeName } = params;

    let categoryData;
    try {
        const getCategory = await GetAllCategory();
        categoryData = getCategory?.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        notFound(); // Ensure 404 behavior
    }

    const validTypeNames = categoryData.map(category => category.category);

    // Validate type and typeName
    if (!validTypes.includes(type) || (typeName && !validTypeNames.includes(typeName))) {
        notFound(); // Redirect to 404 page
    }

    return {
        title: type === "Shop"
            ? `Trendy - Discover the Latest ${typeName || "Collection"}`
            : `Trendy - Shop Premium ${typeName || "Items"} for ${type}`,

        description: type === "Shop"
            ? `Explore a wide range of top-quality ${typeName || "items"} at Trendy. Discover the latest styles and unbeatable deals, all in one place!`
            : `Upgrade your wardrobe with the latest ${typeName || "fashion"} in ${type}. Shop premium quality and enjoy the best prices today!`,
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

        // Ensure API responses are valid
        if (!getCategory?.data) {
            console.error("Category data is missing");
            notFound();
        }

        const validTypeNames = getCategory.data.map(category => category.category) || [];

        // Validate type and typeName
        if (!type || !validTypes.includes(type) || !typeName || !validTypeNames.includes(typeName)) {
            notFound();
        }

        return (
            <TypeNamePage
                getProduct={getProduct?.data || []}
                getBrand={getBrands?.data || []}
                getCategory={getCategory.data}
                type={type}
                typeName={typeName}
            />
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        notFound(); // Ensure consistency in error handling
    }
}

export default TypeName;
