import UsersPage from "@/app/component/admin/Users";
import { fetchUsers } from "@/app/component/Fetch-Api";
import { cookies } from "next/headers";

async function Users() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const getUsers = await fetchUsers(token)

    return ( 
        <>
            <UsersPage getUsers={getUsers} />
        </>
     );
}

export default Users;