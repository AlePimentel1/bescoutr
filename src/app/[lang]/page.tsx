'use client'
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const { data } = useSession({ required: true });
  const dict = useTranslations('HomePage');

  return (
    // TODO: Bg depends on the theme
    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#020d6d] to-[#0e0f1e] text-white">
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl tracking-tight text-black sm:text-[5rem]">
        {dict("title")}
      </h1>
      <h1 className="text-5xl tracking-tight text-black sm:text-[5rem]">
        {dict("title")}
      </h1>
      <h1 className="text-5xl tracking-tight  sm:text-[5rem]">
        {dict("title")}
      </h1>
    </div>
  );
}
