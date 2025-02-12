import { GetAllBrand, GetAllCategory, GetAllProduct } from "@/action";
import HomePage from "@/components/includes/HomePage";

export const metadata = {
  title: "Trendy - Shop Latest Fashion Trends Online",
  description: "Discover the latest fashion trends at Trendy. Shop clothing, accessories, and more with amazing deals. Fast delivery and secure payments.",
  keywords: "fashion, online shopping, trendy clothes, latest trends, best deals, stylish outfits",
  // openGraph: {
  //   title: "Trendy - Shop Latest Fashion Trends Online",
  //   description: "Discover the latest fashion trends at Trendy. Shop clothing, accessories, and more with amazing deals. Fast delivery and secure payments.",
  //   url: "https://yourwebsite.com",
  //   type: "website",
  //   images: [
  //     {
  //       url: "https://yourwebsite.com/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Trendy - Latest Fashion Trends",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Trendy - Shop Latest Fashion Trends Online",
  //   description: "Find the latest fashion trends and shop stylish outfits at Trendy. Best deals available now!",
  //   images: ["https://yourwebsite.com/twitter-image.jpg"],
  // },
};


export default async function Home() {
  try {
    // Fetch all data concurrently
    const [getProduct, getBrands, getCategory] = await Promise.all([
      GetAllProduct(),
      GetAllBrand(),
      GetAllCategory(),
    ]);

    return (
      <>
        <HomePage
          getProduct={getProduct.data}
          getBrands={getBrands.data}
          getCategory={getCategory.data}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <>
        <div>
          <h1>Error Loading Home Page</h1>
          <p>There was an issue fetching the required data. Please try again later.</p>
        </div>
      </>
    );
  }
}
