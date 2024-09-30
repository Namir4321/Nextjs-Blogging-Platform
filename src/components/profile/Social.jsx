import Link from "next/link";
import { platform } from "os";
import {
  LuInstagram,
  LuYoutube,
  LuTwitter,
  LuGithub,
  LuGlobe,
  LuFacebook,
} from "react-icons/lu";
const Social = ({ social_links }) => {
  const social = social_links?.length
    ? Object.entries(social_links[0]).map(([platform, value]) => ({
        platform,
        value,
      }))
    : [];
  const platformIcons = {
    instagram: (
      <LuInstagram className="text-xl text-gray-500 dark:bg-background hover:dark:text-white hover:text-black" />
    ),
    youtube: (
      <LuYoutube className="text-lg text-gray-500 dark:bg-background hover:dark:text-white hover:text-black hover:text-xl" />
    ),
    twitter: (
      <LuTwitter className="text-lg text-gray-500 dark:bg-background hover:dark:text-white hover:text-black hover:text-xl" />
    ),
    github: (
      <LuGithub className="text-lg text-gray-500 dark:bg-background hover:dark:text-white hover:text-black hover:text-xl" />
    ),
    website: (
      <LuGlobe className="text-lg text-gray-500 dark:bg-background hover:dark:text-white hover:text-black hover:text-xl" />
    ),
    facebook: (
      <LuFacebook className="text-lg text-gray-500 dark:bg-background hover:dark:text-white hover:text-black hover:text-xl" />
    ),
  };
  return (
    <div>
      {social && (
        <div
          className="flex gap-x-6 
      gap-y-2 flex-wrap my-7 items-center justify-start
       text-gray-200"
        >
          {social.map(({ platform, value }) =>
            value ? (
              <Link
                key={platform}
                href={value}
                target="_blank"
                className="bg-gray-100 text-black"
                rel="noopener noreferrer"
              >
                {" "}
                {platformIcons[platform.toLowerCase()]}
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Social;
