import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

function CheckoutRedirect() {
    return (
        <div className="mx-4 mt-10 flex h-screen flex-col justify-between">
            <Navbar />
            <div className="flex mx-auto gap-4 w-full md:w-1/2 p-2">
                <div className="flex flex-col gap-5 w-full items-center">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-[200px] bg-slate-300" />
                        <Skeleton className="h-4 w-[600px] bg-slate-300" />
                        <Skeleton className="h-6 w-[400px] bg-slate-300" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CheckoutRedirect;