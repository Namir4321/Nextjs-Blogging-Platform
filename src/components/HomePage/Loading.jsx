import { Skeleton } from "@/components/ui/skeleton";
export const LoadingMainCard = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[660px]" />
        <Skeleton className="h-4 w-[660px]" />
        <Skeleton className="h-4 w-[660px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
      <Skeleton className="h-24 w-24 rounded" />
    </div>
  );
};
export const LoadingTrendCard = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-24 w-24 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[30px]" />
      </div>
    </div>
  );
};
