import BrandsPage from "@/app/component/admin/Brand";
import { fetchBrandData } from "@/app/component/Fetch-Api";

async function Brand() {
    const getBrands = await fetchBrandData()

    return ( 
        <>
            <BrandsPage getBrands={getBrands} />
        </>
     );
}

export default Brand;