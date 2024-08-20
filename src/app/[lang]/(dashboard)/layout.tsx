import Header from "@/components/header/Header";
import SessionProvider from "@/components/session/SessionProvider";
import SideNav from "@/components/side-nav/SideNav";
import { authOptions } from "@/server/auth";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { getMessages } from "next-intl/server";
import { CSPostHogProvider } from "../../_analytics/provider";
import { Private } from "@/components/session/Private";

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
        <SessionProvider session={session} baseUrl="/">
            <CSPostHogProvider>
                <Private>
                    <div className="flex flex-col lg:flex-row">
                        <SideNav />
                        <div className="flex flex-col flex-1">
                            <Header />
                            {children}
                        </div>
                    </div>
                </Private>
            </CSPostHogProvider>
        </SessionProvider>
    );
}
