import CategoryPage from "@/app/component/admin/Category";
import { fetchCategoryData } from "@/app/component/Fetch-Api";

export default async function Category() {
    const getCategory = await fetchCategoryData();

    return (
        <>
            <CategoryPage getCategory={getCategory} />
        </>
    );
}
