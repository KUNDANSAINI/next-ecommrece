import { SingleUser, verifyUserToken } from "@/action";
import UsersDetails from "@/components/admin/Users/UserDetail";
import { redirect } from "next/navigation";

async function UserDetails({ params }) {
    const { id } = params;
    const { success, error, user } = await verifyUserToken()

    if(!user){
        redirect('/login')
    }

    const getSingleUser = await SingleUser(id)

    return (
        <UsersDetails getSingleUser={getSingleUser.data} />
    )
}

export default UserDetails;
