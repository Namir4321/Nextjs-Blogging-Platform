import Dashboard from "@/components/Dashboard/Dashboard";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { ButtonProp } from "@/components/form/ButtonProp";
import { changePasswordAction } from "@/utils/action";

const DashboardPage = () => {
  return (
    <div className="container">
      <FormContainer action={changePasswordAction}>
        <h1 className="max-md:hidden  gap-4 mt-4 mb-2">Change Password</h1>
        <div className="mt-2 gap-4 mb-2 w-full md:max-w-[400px]">
          <FormInput
            className="bg-gray-200 mb-4 pl-6 hover:bg-white outline-none focus-visible:ring-0"
            id="change-password"
            name="oldpassword"
            type="text"
            placeholder="Old password"
            label="Current password"
            iconclassName="absolute text-black top-8 pl-1 text-black"
            icon={<CiLock />}
          />
          <FormInput
            className="bg-gray-200 pl-6 hover:bg-white outline-none focus-visible:ring-0"
            id="change-password"
            name="changepassword"
            type="text"
            placeholder="New password"
            label="New password"
            icon={<CiUnlock />}
            iconclassName="absolute text-black top-8 pl-1 mb-4 text-black"
          />
          <ButtonProp
            text="Change Password"
            className="rounded-full mt-2"
            variant="default"
            size="lg"
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default DashboardPage;
//  className={className}
//           id={name}
//           name={name}
//           type={type}
//           placeholder={placeholder || name}
//           defaultValue={defaultValue}
