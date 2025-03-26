import { verifyUserToken } from "@/action";
import Order from "@/components/admin/order";
import { redirect } from "next/navigation";

async function OrderPage() {

    const { user, success, error } = await verifyUserToken();

    if (!user) {
        redirect('/login')
    }

    return (
        <Order />
    );
}

export default OrderPage;