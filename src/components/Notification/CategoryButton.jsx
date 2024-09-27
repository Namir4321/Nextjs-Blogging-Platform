import Link from "next/link";
import { Button } from "../ui/button";

const CategoryButton = ({ category }) => {
  const filterButton = ["all", "like", "comment", "reply"];

  return (
    <div className="flex mt-4 max-w-[400px] justify-between">
      {filterButton.map((item, index) => {
        const isActive = (!category && item === "all") || category === item;

        return (
          <Link
            href={
              item === "all"
                ? "/setting/notification"
                : `/setting/notification/?category=${item}`
            }
            key={index}
          >
            <Button
              variant={isActive ? "default" : "outline"}
              size="default"
              className={"capitalize rounded-full "}
            >
              {item}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryButton;
