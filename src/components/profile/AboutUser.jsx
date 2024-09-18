import { formatDate } from "@/utils/format";

import Social from "@/components/profile/Social";
const AboutUser = ({ className, joinedAt, social_links, bio }) => {
 
  
  return (
    <div className={" md:w-[90%] md:mt-4  " + className}>
      <p className="text-sm leading-7 ">
        {bio.length ? bio : "Nothing to read here"}
      </p>
      <div>
        <Social social_links={social_links}/>
      </div>
      <p className="text-sm leading-7 text-black">
        Joined on {formatDate(joinedAt)}
      </p>
    </div>
  );
};

export default AboutUser;
