'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Vegan } from "lucide-react";
import { useRouter } from "next/navigation";

function AdminHeader() {
    const router = useRouter()

    return (
        <>
            <nav className=" sticky top-10 z-50 mb-8">
                <div className="flex justify-between">
                    {/* Logo Image */}
                    <span className="flex items-center gap-2" onClick={()=>{router.push('/admin-dashboard')}} >
                        <Vegan className="bg-white rounded-full p-2 shadow-lg" size={40} /><span className="drop-shadow-lg" style={{ fontFamily: 'Rubik Glitch, sans-serif' }}>BAZZKIT PRO</span>
                    </span>
                    <div className="flex gap-2">
                        <Input
                        type="search"
                        placeholder="Search"
                        className="w-72 rounded-3xl"
                        />
                        <Button variant="outline" size="icon" className="rounded-3xl"><Search /></Button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default AdminHeader;