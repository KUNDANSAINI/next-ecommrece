import { Skeleton } from "@/components/ui/skeleton";

function AccountLoader() {
    return (
        <div className="flex w-5/6 justify-center h-[580px] items-center gap-4">
            <Skeleton className="h-[400px] w-[300px] bg-slate-300" />
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
    );
}

export default AccountLoader;