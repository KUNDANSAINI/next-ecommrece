import UsersPage from "@/app/component/admin/Users";
import { fetchUsers } from "@/app/component/Fetch-Api";
import { cookies } from "next/headers";

async function Users() {
    const getUsers = await fetchUsers()

    return ( 
        <>
            <UsersPage getUsers={getUsers} />
        </>
     );
}

export default Users;