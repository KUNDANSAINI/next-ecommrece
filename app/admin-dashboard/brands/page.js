import { GetAllBrand, verifyUserToken } from "@/action";
import Brand from "@/components/admin/Brand";
import { redirect } from "next/navigation";

// This function is now asynchronous as Next.js allows async components in the app directory
export default async function BrandPage() {
    const { success, error, user } = await verifyUserToken()

    if (!user) {
        redirect('/login')
    }
    
    const getBrands = await GetAllBrand();

    // Return the component with the fetched data
    return (
        <>
            <Brand getBrands={getBrands?.data || []} />
        </>
    );
}
