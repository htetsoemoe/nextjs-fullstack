"use client"

import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import {Button} from "@/components/ui/button"
import { UserButton, useAuth } from "@clerk/nextjs"

const Topbar = () => {
  const {isSignedIn} = useAuth()

  const topRoutes = [
    {label: "Instructor", path: "/instructor/courses"},
    {label: "Learning", path: "/learning"},
  ]

  return (
    <div className="flex justify-between items-center p-5">
      <Link href="/">
        <Image src="/logo.png" height={100} width={200} alt="logo" />
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input 
          className="flex-grow bg-[#FFF8EB] rounded-l-full border-none outline-none text-sm py-2 pl-4"
          placeholder="Search for courses"
        />
        <Button
          className="bg-[#FFF8EB] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 bg-[#FDAB04]/80 hover:bg-[#FDAB04]/90"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-5">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-[#FDAB04]"
            >
              {route.label}
            </Link>
          ))}
        </div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Topbar
