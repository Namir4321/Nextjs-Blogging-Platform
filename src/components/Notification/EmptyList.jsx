import Link from "next/link"
import { Button } from "../ui/button"

const EmptyList = ({ heading, message, btnText, link }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">{heading}</h2>
      <p className="text-lg">{message}</p>
      <Button asChild className="mt-4 capitalize" size="lg">
        <Link href={link?"/setting/notification":"/"}>{btnText}</Link>
      </Button>
    </div>
  );
};

export default EmptyList