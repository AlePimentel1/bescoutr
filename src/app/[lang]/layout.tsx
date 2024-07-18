import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { getServerSession } from "next-auth";
import { CSPostHogProvider } from "../_analytics/provider";
import { authOptions } from "@/server/auth";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";


export const metadata = {
  title: "Scoutr",
  description: "Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const session = await getServerSession(authOptions)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${GeistSans.variable}`}>
      <body>
        <main>
          <SessionProvider session={session}>
            <CSPostHogProvider>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </CSPostHogProvider>
          </SessionProvider>
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
