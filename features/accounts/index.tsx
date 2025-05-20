"use client";

import { useSession } from "next-auth/react";
import MainContent from "./components/main-content";
import { UserLayout } from "./layout";

const Page = () => {
  const { data: session } = useSession();

  return (
    <UserLayout>
      <MainContent userId={session?.user.id || ""} />
    </UserLayout>
  );
};

export default Page;
