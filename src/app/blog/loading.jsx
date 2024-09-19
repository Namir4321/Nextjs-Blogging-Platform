import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
  return <Skeleton className="flex justify-center items-center h-[300px] md:h-[500px] w-[900px] rounded" />;
};

export default loading;
