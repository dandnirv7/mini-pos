import { Card } from "@/components/ui/card";
import AuthLayout from "../auth-layout";
import { UserAuthForm } from "./components/user-auth-form";
import Link from "next/link";

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className="p-6 space-y-3">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <UserAuthForm />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          By clicking login, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </Card>
    </AuthLayout>
  );
}
