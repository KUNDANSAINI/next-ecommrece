import { SingleUser } from "@/action";
import UsersDetails from "@/components/admin/Users/UserDetail";

async function UserDetails({ params }) {
    const { id } = params;

    try {
        // Fetch single user details
        const getSingleUser = await SingleUser(id).catch((err) => {
            console.error("Failed to fetch single user details:", err);
            return { data: null }; // Fallback to null in case of error
        });

        // Handle case where no user is found
        if (!getSingleUser?.data) {
            return <div>User not found or failed to load. Please try again later.</div>;
        }

        return <UsersDetails getSingleUser={getSingleUser.data} />;
    } catch (error) {
        console.error("An unexpected error occurred:", error);

        // Render fallback UI in case of a major error
        return <div>Failed to load user details. Please try again later.</div>;
    }
}

export default UserDetails;
