import { verifyUserToken } from "@/action";
import Cart from "@/components/includes/Cart";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Your Cart - Trendy | Review & Checkout",
    description: "Review your selected fashion items and proceed to checkout at Trendy. Secure payments and fast delivery ensure a seamless shopping experience.",
    keywords: "shopping cart, checkout, trendy fashion, online shopping, best deals, stylish outfits",
    // openGraph: {
    //   title: "Your Cart - Trendy | Review & Checkout",
    //   description: "Review your selected fashion items and proceed to checkout at Trendy. Secure payments and fast delivery ensure a seamless shopping experience.",
    //   url: "https://yourwebsite.com/cart",
    //   type: "website",
    //   images: [
    //     {
    //       url: "https://yourwebsite.com/cart-og-image.jpg",
    //       width: 1200,
    //       height: 630,
    //       alt: "Your Cart at Trendy",
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: "Your Cart - Trendy | Review & Checkout",
    //   description: "Ready to checkout? Review your cart and enjoy amazing fashion deals at Trendy.",
    //   images: ["https://yourwebsite.com/cart-twitter-image.jpg"],
    // },
};


async function CartPage() {

    const { user, success, error } = await verifyUserToken();

    if (!user) {
        redirect('/login')
    }

    return (
        <>
            <Cart />
        </>
    );
}

export default CartPage;