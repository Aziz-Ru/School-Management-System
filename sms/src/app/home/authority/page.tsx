import { decrypt } from "@/session";
import { cookies } from "next/headers";

const Authority = async () => {
  const session = cookies().get("__session")?.value;
  const { user } = await decrypt(session);
  

  return <div>Authority</div>;
};

export default Authority;
