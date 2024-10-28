import Navbar from "../component/Navbar";
import AdminLeftbar from "../component/Admin-Leftbar";

function AdminDashboard() {
    return (
        <>
            <div>
                <Navbar />
                <div className="flex px-2">
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