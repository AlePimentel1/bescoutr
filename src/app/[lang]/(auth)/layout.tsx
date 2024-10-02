import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Image from "next/image";

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
    const messages = await getMessages()
    return (
        <NextIntlClientProvider messages={messages}>
            <span
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '25%',
                    transform: 'translate(-50%, -50%)',
                    width: '700px',
                    height: '700px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(1,39,87,0.7) 20%, rgba(1,39,87,0.5) 70%)',
                    boxShadow: '0 0 60px 60px rgba(1,39,87,0.5)',
                    zIndex: -999,
                }}
            />
            <div className="w-full lg:grid min-h-screen lg:grid-cols-2 ">
                <div className="flex items-center justify-center py-12">
                    {children}
                </div>
                <div className="hidden lg:flex h-screen items-center justify-center">
                    <Image
                        src="/backgrounds/auth-bg.png"
                        alt=""
                        width={1080}
                        height={700}
                        className="h-[95%] object-contain"
                    />
                </div>
            </div>
        </NextIntlClientProvider>
    );
}
