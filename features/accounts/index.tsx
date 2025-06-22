import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserPage from "./components/user-page.server";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  return <UserPage userId={session.user.id} />;
}
