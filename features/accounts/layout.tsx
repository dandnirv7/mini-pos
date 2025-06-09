import { ReactNode } from "react";
import Header from "./components/header";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container px-4 py-6 mx-auto">{children}</main>
    </div>
  );
}
