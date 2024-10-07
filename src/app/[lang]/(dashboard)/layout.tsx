import { Private } from "@/components/session/Private";
import SessionProvider from "@/components/session/SessionProvider";
import { authOptions } from "@/server/auth";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
    const messages = await getMessages()

    return (
        <>
            <span
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '75%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(1,39,87,0.7) 20%, rgba(1,39,87,0.5) 70%)',
                    boxShadow: '0 0 60px 60px rgba(1,39,87,0.5)',
                    zIndex: -999,
                }}
                className="blur-3xl w-[250px] h-[250px] md:w-[400px] md:h-[400px] "
            />
            <NextIntlClientProvider messages={messages}>
                <SessionProvider session={session} baseUrl="/">
                    <CSPostHogProvider>
                        <Private>
                            {children}
                        </Private>
                    </CSPostHogProvider>
                </SessionProvider>
            </NextIntlClientProvider>
        </>
    );
}
