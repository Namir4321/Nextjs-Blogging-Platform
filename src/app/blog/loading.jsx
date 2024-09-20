import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <Skeleton className=" h-[300px] md:h-[500px] w-[900px] rounded" />
    </div>
  );
};

export default loading;
