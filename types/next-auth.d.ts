import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      fullName: string;
      avatar: string;
    } & DefaultSession["user"];
  }
}
