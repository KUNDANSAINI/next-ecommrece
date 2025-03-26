import { GetAllBrand, GetAllCategory, GetAllProduct } from "@/action";
import Page from "@/components/includes/Type-Page";
import { notFound } from "next/navigation";

const validTypes = ["Shop", "Men", "Women", "Kids"];

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
    const dataType = params.type;

    if (!validTypes.includes(dataType)) {
        notFound();
    }
    
    return {
        title: dataType === "Shop" 
            ? "Trendy - Discover the Latest Collections" 
            : `Trendy - Explore More ${dataType} Products`,
        
        description: dataType === "Shop" 
            ? "Explore a wide range of top-quality products at Trendy. Find the latest trends and best deals all in one place!" 
            : `Discover premium ${dataType} products at unbeatable prices. Shop now and stay ahead in style!`,
    };
}


async function Type({ params }) {
    const { type } = params;

    if (!type || !validTypes.includes(type)) {
        notFound();
    }

    try {
        // Fetch all data concurrently
        const [getProduct, getBrands, getCategory] = await Promise.all([
            GetAllProduct(),
            GetAllBrand(),
            GetAllCategory(),
        ]);

        return (
            <>
                <Page
                    getProduct={getProduct.data}
                    getBrand={getBrands.data}
                    getCategory={getCategory.data}
                    type={type}
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

export default Type;
