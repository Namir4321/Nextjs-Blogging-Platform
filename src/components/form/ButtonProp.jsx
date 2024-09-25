"use client";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/utils/action";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
export const ButtonProp = ({ variant, btnsize, type, text, className }) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        variant={variant}
        disabled={pending}
        size={btnsize}
        className={className}
        type={type}
      >
        {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : text}
      </Button>
    </>
  );
};

export const CardSigninButton = async () => {
  const router = useRouter();
  const handleFavouriteLogin = async () => {
    const user = await getAuthUser();
    if (!user) router.push("/signin");
  };
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
      onClick={handleFavouriteLogin}
    >
      <FaRegHeart />
    </Button>
  );
};
export const CardSubmitButton = ({ isFavourite }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="icon"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : isFavourite ? (
        <FcLike />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
