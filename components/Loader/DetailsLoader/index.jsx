import { Skeleton } from "@/components/ui/skeleton";

function DetailsLoader() {
    return (
        <>
            <div className="my-8 p-4">
                <div className="w-full flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-2/5 flex flex-col lg:flex-row lg:justify-evenly gap-4 items-center h-[600px]">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-[500px] w-[350px] bg-slate-300" />
                        </div>
                    </div>
                    <div className="w-full lg:w-3/5">
                        <div className="flex flex-col gap-2">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px] bg-slate-300" />
                                <Skeleton className="h-4 w-[600px] bg-slate-300" />
                                <Skeleton className="h-4 w-[150px] bg-slate-300" />
                                <Skeleton className="h-8 w-[200px] bg-slate-300" />
                                <Skeleton className="h-8 w-[300px] bg-slate-300" />
                            </div>
                            <div className="flex space-x-2">
                                <Skeleton className="h-10 w-[250px] bg-slate-300" />
                                <Skeleton className="h-10 w-[250px] bg-slate-300" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-[200px] bg-slate-300" />
                        <Skeleton className="h-4 w-[300px] bg-slate-300" />
                        <Skeleton className="h-4 w-[500px] bg-slate-300" />
                        <Skeleton className="h-4 w-[400px] bg-slate-300" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsLoader;