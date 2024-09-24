import FormInput from "@/components/form/FormInput";
import ImageFormContainer from "@/components/form/ImageFormContainer";
import { fetchSocialLink, getProfileImage, ProfileImageAction, UpdateProfileAction } from "@/utils/action";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import TextAreaInput from "@/components/form/TextAreaInput";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import FormContainer from "@/components/form/FormContainer";
import { ButtonProp } from "@/components/form/ButtonProp";

const page = async () => {
  const profile = await getProfileImage();
  const social = await fetchSocialLink();
  return (
    <div>
      <h1 className="max-md:hidden">Edit Profile</h1>
      <div
        className="flex flex-col 
        lg:flex-row items-center md:items-start py-10 gap-8 lg:gap-10"
      >
        <div className="">
          <ImageFormContainer
            image={profile.profileImage}
            name={profile.username}
            action={ProfileImageAction}
            text="update Profile Image"
          />
        </div>
        <div className="w-full p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
            <FormInput
              className="mb-4 bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
              id="change-password"
              disabled={true}
              name="oldpassword"
              type="text"
              // placeholder={profile.username}
              label=" "
              defaultValue={profile.firstName}
              iconclassName="absolute text-black top-3 pl-1 text-black"
              icon={<FaRegUser />}
            />
            <FormInput
              className="mb-4 bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
              id="change-password"
              disabled={true}
              name="oldpassword"
              type="text"
              // placeholder={profile.username}
              label=" "
              defaultValue={profile.email}
              iconclassName="absolute text-black top-3 pl-1 text-black"
              icon={<MdOutlineEmail />}
            />
          </div>
          <FormContainer action={UpdateProfileAction}>
            <FormInput
              className="mb-4 bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
              id="change-password"
              // disabled={true}
              name="username"
              type="text"
              // placeholder={profile.username}
              label=" "
              defaultValue={profile.username}
              iconclassName="absolute text-black top-3 pl-1 text-black"
              icon={<MdAlternateEmail />}
            />
            <TextAreaInput
              name="Bio"
              labelText=" "
              defaultValue={profile.bio}
              className="mb-4 bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
              row="5"
            />
            <p className="text-muted-foreground mb-4 mt-4">
              Add your social handles
            </p>
            <div className="grid mt-4 grid-cols-1 md:grid-cols-2 md:gap-5 mb-4 gap-4 ">
              <FormInput
                className=" bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
                id="youtube"
                name="youtube"
                type="text"
                label=" "
                defaultValue={social?.youtube ? social.youtube : ""}
                placeholder={social?.youtube ? social.youtube : ""}
                iconclassName="absolute text-black top-3 pl-1 text-black"
                icon={<FaYoutube />}
              />
              <FormInput
                className=" bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
                id="instagram"
                name="instagram"
                type="text"
                label=" "
                defaultValue={social?.instagram ? social.instagram : ""}
                placeholder={social?.instagram ? social.instagram : ""}
                iconclassName="absolute text-black top-3 pl-1 text-black"
                icon={<FaInstagram />}
              />
              <FormInput
                className=" bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
                id="facebook"
                name="facebook"
                type="text"
                label=" "
                defaultValue={social?.facebook ? social.facebook : ""}
                placeholder={social?.facebook ? social.facebook : ""}
                iconclassName="absolute text-black top-3 pl-1 text-black"
                icon={<FaFacebookF />}
              />
              <FormInput
                className=" bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
                id="twitter"
                name="twitter"
                type="text"
                label=" "
                defaultValue={social?.twitter ? social.twitter : ""}
                placeholder={social?.twitter ? social.twitter : ""}
                iconclassName="absolute text-black top-3 pl-1 text-black"
                icon={<FaXTwitter />}
              />
              <FormInput
                className=" bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
                id="github"
                name="github"
                type="text"
                label=" "
                defaultValue={social?.github ? social.github : ""}
                placeholder={social?.github ? social.github : ""}
                iconclassName="absolute text-black top-3 pl-1 text-black"
                icon={<FaGithub />}
              />
              <FormInput
                className=" bg-gray-100 text-black pl-7 hover:bg-white outline-none focus-visible:ring-0"
                id="website"
                name="website"
                type="text"
                label=" "
                defaultValue={social?.website ? social.website : ""}
                placeholder={social?.website ? social.website : ""}
                iconclassName="absolute text-black top-3 pl-1 text-black"
                icon={<CiGlobe />}
              />
            </div>
            <ButtonProp
              text="Update Profile"
              type="submit"
              variant="default"
              btnsize="default"
            />
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

export default page;
