import { verifyUserToken } from "@/action";
import Dashboard from "@/components/admin/Dashboard";
import { redirect } from "next/navigation";


export default async function AdminDashboard() {
    const { user, success, error } = await verifyUserToken();

    if (!user) {
        redirect('/login')
    }


    return (
        <Dashboard />
    )
}
