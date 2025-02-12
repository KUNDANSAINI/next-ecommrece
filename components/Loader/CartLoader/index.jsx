import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CartLoader() {
    return (
        <>
            <div className="flex flex-col items-center gap-4 my-8">
                <Card className="w-full md:w-1/2 p-4 mt-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-[200px] w-[150px] bg-slate-300" />
                        <div className="flex flex-col gap-2">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[600px] bg-slate-300" />
                                <Skeleton className="h-4 w-[250px] bg-slate-300" />
                                <Skeleton className="h-4 w-[200px] bg-slate-300" />
                                <Skeleton className="h-4 w-[150px] bg-slate-300" />
                            </div>
                            <div className="flex space-x-2">
                                <Skeleton className="h-4 w-[250px] bg-slate-300" />
                                <Skeleton className="h-4 w-[250px] bg-slate-300" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default CartLoader;