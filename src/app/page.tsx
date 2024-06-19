import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import posthog from "posthog-js";

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  console.log('acaaaa', session)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#020d6d] to-[#0e0f1e] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Bienvenido a Scoutr {session?.user?.username} donde id es {session?.user?.id}
        </h1>
      </div>
    </main>
  );
}
