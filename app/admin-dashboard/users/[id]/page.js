import UsersDetailsPage from "@/app/component/admin/Users/UserDetails";
import { fetchSingleUser } from "@/app/component/Fetch-Api";
import { cookies } from "next/headers";

async function UsersDetails({params}) {
    const { id } = params
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const getSingleUser = await fetchSingleUser(id,token) 
    
    return ( 
        <>
            <UsersDetailsPage getSingleUser={getSingleUser} />
        </>
     );
}

export default UsersDetails;