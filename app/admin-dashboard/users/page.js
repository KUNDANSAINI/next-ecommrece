import { GetAllUsers, verifyUserToken } from "@/action";
import User from "@/components/admin/Users";
import { redirect } from "next/navigation";

async function UserPage() {
    const { success, error, user } = await verifyUserToken()

    if (!user) {
        redirect('/login')
    }

    const getUsers = await GetAllUsers()

    return (
        <User getUsers={getUsers.data} />
    )
}

export default UserPage;
