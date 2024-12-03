import UsersDetailsPage from "@/app/component/admin/Users/UserDetails";
import { fetchSingleUser } from "@/app/component/Fetch-Api";

async function UsersDetails({params}) {
    const { id } = params
    const getSingleUser = await fetchSingleUser(id) 
    
    return ( 
        <>
            <UsersDetailsPage getSingleUser={getSingleUser} />
        </>
     );
}

export default UsersDetails;