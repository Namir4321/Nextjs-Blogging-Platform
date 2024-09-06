import { ButtonProp } from "@/components/form/ButtonProp";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/utils/action";
import { LuFileSignature } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import NavLink from "@/components/Navbar/NavLink";
const NavAuth = async () => {
  const isLoggedIn = await getAuthUser();
  return (
    <div className="flex gap-4">
      {isLoggedIn ? (
        <>
        <Button
          variant="ghost"
          type="button"
          btnsize="icon"
          className="rounded-full bg-slate-200 m-0 p-2"
        >
          <CiBellOn className="w-6 h-6" />
        </Button>
        <NavLink/>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            type="button"
            btnsize="default"
            className="rounded-full  gap-2 hidden sm:flex"
          >
            <LuFileSignature />
            Write
          </Button>
          <ButtonProp
            variant="default"
            type="button"
            text="Sign in"
            btnsize="default"
            className="rounded-full hidden sm:block"
          />
          <ButtonProp
            variant="ghost"
            type="button"
            text="Sign up"
            btnsize="default"
            className="rounded-full bg-slate-100"
          />
        </>
      )}
    </div>
  );
};

export default NavAuth;
