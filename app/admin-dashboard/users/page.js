import { GetAllUsers } from "@/action";
import User from "@/components/admin/Users";

async function UserPage() {
    try {
        // Fetch the users
        const getUsers = await GetAllUsers().catch((err) => {
            console.error("Failed to fetch users:", err);
            return { data: [] }; // Fallback to empty array
        });

        // Render the `User` component with fetched data
        return <User getUsers={getUsers.data} />;
    } catch (error) {
        console.error("An unexpected error occurred:", error);

        // Render a fallback UI if an error occurs
        return <div>Failed to load users. Please try again later.</div>;
    }
}

export default UserPage;
