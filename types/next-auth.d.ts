import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      fullName: string;
      role: string;
      sessionToken: string;
    } & DefaultSession["user"];
  }
}
