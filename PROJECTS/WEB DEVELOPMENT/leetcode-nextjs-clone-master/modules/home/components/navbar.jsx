import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { UserRole } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = ({userRole}) => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="TreeBio" width={42} height={42} />
            <span className="font-bold text-2xl tracking-widest text-amber-300">
              LeetCode
            </span>
          </Link>

          <div className="flex flex-row items-center justify-center gap-x-4">
            <Link
              href="/problems"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400  hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
            >
              Problems
            </Link>
              <Link
              href="/about"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400  hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400  hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
            >
              Profile
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <SignedIn>
              {userRole && userRole === UserRole.ADMIN && (
                <Link href={"/create-problem"}>
                  <Button variant={"outline"} size={"default"}>
                    Create Problem
                  </Button>
                </Link>
              )}
              <UserButton />
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="text-sm font-medium bg-amber-400 hover:bg-amber-500 text-white"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar