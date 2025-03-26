import { verifyUserToken } from "@/action";
import DeliveredPage from "@/components/admin/delivered";
import { redirect } from "next/navigation";

async function Delivered() {

    const { user, success, error } = await verifyUserToken();

    if (!user) {
        redirect('/login')
    }

    return (
        <>
            <DeliveredPage />
        </>
    );
}

export default Delivered;