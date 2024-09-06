import { getAuthUser } from "@/utils/action";
export default async function Home() {
  const getauth = await getAuthUser();
  return (
    <>
      <h6>{getauth}</h6>
    </>
  );
}
