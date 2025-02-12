import { SingleProduct } from "@/action";
import ProductID from "@/components/includes/ProductID";

export async function generateMetadata({ params }) {
    const { type, typeName, id } = params;

    if (id) {
        try {
            const product = await SingleProduct(id);
            const productName = product?.data?.productName || "Product";

            return {
                title: `Trendy - Buy ${productName} Online`,
                description: `Discover premium ${productName} in our ${typeName} collection. Shop now for the best deals and quality!`
            };
        } catch (error) {
            console.error("Error fetching product data:", error);

            return {
                title: `Trendy - Explore ${typeName} Details`,
                description: `Get in-depth details about this ${typeName}. Discover its premium quality, latest trends, and unbeatable offers at Trendy!`
            };
        }
    }

    return {
        title: type === "Shop"
            ? `Trendy - Discover the Latest ${typeName} Collection`
            : `Trendy - Shop Premium ${typeName} for ${type}`,

        description: type === "Shop"
            ? `Explore a wide range of top-quality ${typeName} at Trendy. Discover the latest styles and unbeatable deals, all in one place!`
            : `Upgrade your wardrobe with the latest ${typeName} in ${type}. Shop premium quality and enjoy the best prices today!`
    };
}

async function ID({ params }) {
    const { type, typeName, id } = params;

    try {
        return (
            <ProductID type={type} typeName={typeName} id={id}/>
        );
    } catch (error) {
        console.error("Error fetching products:", error);

        return (
            <div>
                <h1>Error Loading Product</h1>
                <p>There was an issue fetching the product details. Please try again later.</p>
            </div>
        );
    }
}

export default ID;
