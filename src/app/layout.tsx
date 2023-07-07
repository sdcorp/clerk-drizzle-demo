import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="flex min-h-screen flex-col items-center gap-8 p-24">
            <nav className="flex gap-8">
              <Link className="hover:underline" href="/">
                Home
              </Link>
              <Link className="hover:underline" href="/public">
                /Public
              </Link>
            </nav>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
