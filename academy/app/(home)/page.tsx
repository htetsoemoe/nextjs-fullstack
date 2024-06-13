import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <>
      <h1 className="text-2xl text-center mt-10 font-semibold">Home Page</h1>
      <UserButton afterSignOutUrl="/sign-in" />
   </>
  );
}
