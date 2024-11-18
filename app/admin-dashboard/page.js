import AdminLeftbar from "../component/Admin-Leftbar";
import AdminHeader from "../component/AdminHeader";

function AdminDashboard() {
    return (
        <>
            <div className="border rounded-3xl mx-12 my-4 h-screen bg-[#F0F1F0] p-4">
                <AdminHeader />
                <div className="flex mt-4">
                    <div className="hidden md:block md:w-1/4 lg:w-1/6">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full mx-4 mt-4">
                        <h1 className="text-center text-3xl font-semibold">Dashboard page</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;