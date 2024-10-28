import Link from "next/link";

function AdminLeftbar() {
    return (
        <>
            <div className="flex flex-col rounded-lg md:border md:h-full">
                <ul className="my-1 mx-3">
                    <Link href={'/admin-dashboard'}><li className="py-2 text-center hover:bg-zinc-900 hover:text-white border-b hover:rounded">Dashboard</li></Link>
                    <Link href={'/admin-dashboard/users'}><li className="py-2 text-center hover:bg-zinc-900 hover:text-white border-b hover:rounded">Users</li></Link>
                    <Link href={'/admin-dashboard/product'}><li className="py-2 text-center hover:bg-zinc-900 hover:text-white border-b hover:rounded">Product</li></Link>
                    <Link href={'/admin-dashboard/brands'}><li className="py-2 text-center hover:bg-zinc-900 hover:text-white border-b hover:rounded">Brands</li></Link>
                    <Link href={'/admin-dashboard/category'}><li className="py-2 text-center hover:bg-zinc-900 hover:text-white border-b hover:rounded">Category</li></Link>
                    <Link href={'/admin-dashboard/subcategory'}><li className="py-2 text-center hover:bg-zinc-900 hover:text-white border-b hover:rounded">SubCategory</li></Link>
                </ul>
            </div>
        </>
    );
}

export default AdminLeftbar;