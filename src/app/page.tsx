import { getAuthUser } from "@/utils/action";
import HomePage from "@/components/HomePage/Home";
export default async function Home() {
  const getauth = await getAuthUser();
  return (
    <>
    <HomePage/>
      <h6>{getauth}</h6>
    </>
  );
}
