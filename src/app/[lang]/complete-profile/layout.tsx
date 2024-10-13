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
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    bottom: '0',
                    height: '50%',
                    top: '50%',
                    zIndex: -9999,
                    backgroundImage: "url('/textures/hexagons.svg')"
                }}
            >
                <span className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%,rgba(4, 11, 21, 0.9) 60%, rgba(4, 11, 21, 1) 100%)',
                    }}
                />
            </div>

            {/* Radial Gradient */}
            <span
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -90%)',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(41, 97, 58, 0.7) 10%, rgba(41, 97, 58, 0.5) 50%)',
                    boxShadow: '0 0 60px 60px rgba(41, 97, 58, 0.5)',
                    zIndex: -999,  // Cambiar a un valor positivo para que esté en frente
                }}
            />
            <NextIntlClientProvider messages={messages}>
                <SessionProvider session={session} baseUrl="/">
                    <CSPostHogProvider>
                        {children}
                    </CSPostHogProvider>
                </SessionProvider>
            </NextIntlClientProvider>
        </>
    );
}
