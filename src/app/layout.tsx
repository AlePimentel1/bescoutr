import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import SideNav from "@/components/side-nav/SideNav";
import { brockmann } from "@/lib/fonts";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";
import { CSPostHogProvider } from "./_analytics/provider";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Be Scoutr",
  description: "Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
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
    <html lang={locale} className={brockmann.className}>
      <body>
        <main>
          <SessionProvider session={session} baseUrl="/">
            <CSPostHogProvider>
              <NextIntlClientProvider messages={messages}>
                {/* <SideNav> */}
                <div className="flex flex-row bg-night-sky-800">
                  <SideNav />
                  <div className="flex flex-col flex-1">
                    <Header />
                    {/* <div className="flex flex-row"> */}
                    {children}
                    {/* <div className="h-screen bg-red-500 w-[350px]">
                      </div> */}
                    {/* </div> */}
                  </div>
                </div>
                {/* </SideNav> */}
              </NextIntlClientProvider>
            </CSPostHogProvider>
          </SessionProvider>
        </main>
        <Toaster richColors />
      </body>
    </html >
  );
}
