'use client'
import Main from "@/components/home/Main";
import News from "@/components/home/News";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const { data } = useSession({ required: true });

  return (
    <div className="flex flex-row h-full">
      <Main />
      <News />
    </div>
  );
}
