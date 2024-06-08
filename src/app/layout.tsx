import NavMenu from "@/components/NavMenu";
import SessionProvider from "@/components/SessionProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { getServerSession } from "next-auth";


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

  const session = await getServerSession()

  return (
    <html lang="es" className={`${GeistSans.variable}`}>
      <body>
        <main>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
