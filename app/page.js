import { fetchBrandData, fetchCategoryData, fetchProduct } from "./component/Fetch-Api";
import HomePage from "./component/Home";

async function Home() {
  const getCategory = await fetchCategoryData()
  const getBrands = await fetchBrandData()
  const getProduct = await fetchProduct() 
  return ( 
    <>
      <HomePage getCategory={getCategory} getBrands={getBrands} getProduct={getProduct} />
    </>
   );
}

export default Home;