import SubCategoryPage from "@/app/component/admin/SubCategory";
import { fetchSubCategoryData } from "@/app/component/Fetch-Api";
import { cookies } from "next/headers";

async function SubCategory() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const getSubCategory = await fetchSubCategoryData(token)
    return ( 
        <>
            <SubCategoryPage getSubCategory={getSubCategory} />
        </>
     );
}

export default SubCategory;