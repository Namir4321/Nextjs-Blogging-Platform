import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";

const Navlogo = () => {
  return (
    <div>
      <Button variant="link" size="icon" className="mt-[1px] p-0" asChild>
        <Link
          href="/"
          className="w-[40px] h-[40px] flex items-center justify-center"
        >
          <FaBlog className="w-full h-full" />
        </Link>
      </Button>
    </div>
  );
};

export default Navlogo;
