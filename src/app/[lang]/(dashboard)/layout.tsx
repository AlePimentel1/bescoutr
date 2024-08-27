import { Private } from "@/components/session/Private";
import SessionProvider from "@/components/session/SessionProvider";
import { authOptions } from "@/server/auth";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { CSPostHogProvider } from "../../_analytics/provider";

export const metadata = {
    title: "Be Scoutr",
    description: "Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.",
    icons: [{ rel: "icon", url: "/favicon.webp" }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)

    return (
        <SessionProvider session={session} baseUrl="/">
            <CSPostHogProvider>
                <Private>
                    {children}
                </Private>
            </CSPostHogProvider>
        </SessionProvider>
    );
}
