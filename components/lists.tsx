"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const Lists = () => {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href="/register">Register</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </ul>
  );
};

export default Lists;
