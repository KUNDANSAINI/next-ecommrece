import { FetchCart, fetchProfile, verifyUserToken } from "@/action";
import CheckoutPage from "@/components/includes/checkout";
import { redirect } from "next/navigation";

async function Checkout() {

  const { user, success, error } = await verifyUserToken();

  if (!user) {
    redirect('/login')
  }

  const [userAddress, cartItems] = await Promise.all([
    fetchProfile(user?.id),
    FetchCart(user?.id)
  ]);

  return (
    <>
      <CheckoutPage userAddress={userAddress?.data} cartItems={cartItems?.getCartProduct} />
    </>
  );
}

export default Checkout;