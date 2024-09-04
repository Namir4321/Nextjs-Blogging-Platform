import Image from "next/image";
import { getAuthUser } from "@/utils/action";
import NavSignOut from "@/components/Navbar/NavSignOut";
export default async function Home() {
  const getauth = await getAuthUser();
  return (
    <>
      <NavSignOut />
      <h6>{getauth}</h6>
    </>
  );
}
