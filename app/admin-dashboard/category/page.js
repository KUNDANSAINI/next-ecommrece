import { GetAllCategory, verifyUserToken } from "@/action";
import Category from "@/components/admin/Category";
import { redirect } from "next/navigation";

async function CategoryPage() {
    const { success, error, user } = await verifyUserToken()

    if (!user) {
        redirect('/login')
    }

    const getCategory = await GetAllCategory()

    return (
        <>
            <Category getCategory={getCategory.data} />
        </>
    );
}

export default CategoryPage;