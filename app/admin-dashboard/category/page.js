import { GetAllCategory } from "@/action";
import Category from "@/components/admin/Category";

async function CategoryPage() {

    const getCategory = await GetAllCategory()

    return ( 
        <>
            <Category getCategory={getCategory.data} />
        </>
     );
}

export default CategoryPage;