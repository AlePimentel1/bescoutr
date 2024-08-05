'use client'
import Main from "@/components/home/Main";
import News from "@/components/home/News";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const { data } = useSession({ required: true });

  return (
    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#020d6d] to-[#0e0f1e] text-white">
    <div className="flex flex-row h-full">
      {/* <div className="flex-1 flex flex-col">
        <p>chau</p>
      </div> */}
      <Main />
      <News />
      {/* <div className="w-[350px] bg-green-500">
        <p>hola</p>
      </div> */}

    </div>
  );
}
