import SubCategoryPage from "@/app/component/admin/SubCategory";
import { fetchSubCategoryData } from "@/app/component/Fetch-Api";

async function SubCategory() {
    const getSubCategory = await fetchSubCategoryData()
    return ( 
        <>
            <SubCategoryPage getSubCategory={getSubCategory} />
        </>
     );
}

export default SubCategory;