import { SingleProduct } from "@/action";
import ProductID from "@/components/includes/ProductID";
import { notFound } from "next/navigation";

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
    const { type, typeName, id } = params;

    if (id) {
        try {
            const product = await SingleProduct(id);

            // If product is not found, trigger 404
            if (!product?.data) {
                console.error(`Product with ID ${id} not found.`);
                notFound();
            }

            const productName = product.data.productName || "Product";

            return {
                title: `Trendy - Buy ${productName} Online`,
                description: `Discover premium ${productName} in our ${typeName} collection. Shop now for the best deals and quality!`,
            };
        } catch (error) {
            console.error("Error fetching product data:", error);
            notFound(); // Trigger 404 for errors
        }
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

async function ID({ params }) {
    const { type, typeName, id } = params;

    try {
        if (!id) {
            console.error("Missing product ID");
            notFound();
        }

        const product = await SingleProduct(id);

        // If product is not found, trigger 404
        if (!product?.data) {
            console.error(`Product with ID ${id} not found.`);
            notFound();
        }

        return <ProductID type={type} typeName={typeName} id={id} />;
    } catch (error) {
        console.error("Error fetching product data:", error);
        notFound(); // Ensure consistent 404 behavior
    }
}

export default ID;
