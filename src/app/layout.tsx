import NavMenu from "@/components/NavMenu";
import SessionProvider from "@/components/SessionProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { getServerSession } from "next-auth";


export const metadata = {
  title: "BeScoutr",
  description: "Somos una plataforma de scouting",
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
