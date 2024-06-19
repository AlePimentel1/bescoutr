import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { getServerSession } from "next-auth";
import { CSPostHogProvider } from "./_analytics/provider";
import { authOptions } from "@/server/auth";


export const metadata = {
  title: "Scoutr",
  description: "Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="es" className={`${GeistSans.variable}`}>
      <body>
        <main>
          <SessionProvider session={session}>
            <CSPostHogProvider>
              {children}
            </CSPostHogProvider>
          </SessionProvider>
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
