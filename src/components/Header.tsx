import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <nav className="flex items-center gap-8">
      <Link className="hover:underline" href="/">
        Home
      </Link>
      <Link className="hover:underline" href="/public">
        /Public
      </Link>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-md bg-blue-500 p-2">Sign-In</button>
        </SignInButton>
      </SignedOut>
    </nav>
  )
}
