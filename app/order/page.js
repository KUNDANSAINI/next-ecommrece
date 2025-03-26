import { verifyUserToken } from "@/action";
import OrderPage from "@/components/includes/order";
import { redirect } from "next/navigation";

async function Order() {

    const { user, success, error } = await verifyUserToken();

    if (!user) {
        redirect('/login')
    }

    return (
        <>
            <OrderPage />
        </>
    );
}

export default Order;