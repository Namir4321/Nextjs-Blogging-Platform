import { ButtonProp } from "@/components/form/ButtonProp";
import { Button } from "@/components/ui/button";
import { fetchNotification, getAuthUser } from "@/utils/action";
import { LuFileSignature } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import { FaHeart, FaRegCircle } from "react-icons/fa";

import NavLink from "@/components/Navbar/NavLink";
import Link from "next/link";
const NavAuth = async () => {
  const isLoggedIn = await getAuthUser();
  const notification = await fetchNotification("seen");

  return (
    <div className="flex gap-4">
      {isLoggedIn ? (
        <>
          <Button
            variant="ghost"
            type="button"
            btnsize="icon"
            className="rounded-full bg-slate-200 dark:bg-muted m-0 p-2"
          >
            <Link href="/setting/notification">
              {notification.length > 0 && (
                <span className=" relative">
                  <FaRegCircle className="text-red-400 bg-red-400 rounded-full absolute left-[1px]" />
                </span>
              )}
              <CiBellOn className="w-6 h-6" />
            </Link>
          </Button>
          <NavLink />
        </>
      ) : (
        <>
          <Link href="/signin">
            <Button
              variant="ghost"
              type="button"
              btnsize="default"
              className="rounded-full  gap-2 hidden sm:flex"
            >
              <LuFileSignature />
              Write
            </Button>
          </Link>
          <Link href="/signin">
            <ButtonProp
              variant="default"
              type="button"
              text="Sign in"
              btnsize="default"
              className="rounded-full "
            />
          </Link>
          <Link href="/signup">
            <ButtonProp
              variant="ghost"
              type="button"
              text="Sign up"
              btnsize="default"
              className="rounded-full bg-slate-100 dark:bg-muted hidden sm:block"
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default NavAuth;
