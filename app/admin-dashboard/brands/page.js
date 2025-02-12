import { GetAllBrand } from "@/action";
import Brand from "@/components/admin/Brand";

// This function is now asynchronous as Next.js allows async components in the app directory
export default async function BrandPage() {
    try {
        // Fetch the brands
        const getBrands = await GetAllBrand();

        // Return the component with the fetched data
        return (
            <>
                <Brand getBrands={getBrands?.data || []} />
            </>
        );
    } catch (error) {
        console.error("Error fetching brands:", error);

        // Handle errors gracefully (e.g., show an empty state or error message)
        return (
            <>
                <div>Failed to load brands. Please try again later.</div>
            </>
        );
    }
}
