import { Toaster } from "@/components/ui/sonner";
import { brockmann } from "@/lib/fonts";
import "@/styles/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";

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
  const messages = await getMessages()

  return (
    <html lang={locale} className={brockmann.className}>
      <body className="relative">
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '75%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(1,39,87,0.7) 20%, rgba(1,39,87,0.5) 70%)',
            boxShadow: '0 0 60px 60px rgba(1,39,87,0.5)',
            zIndex: -999,
          }}
        />
        <main>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
        <Toaster richColors />
      </body>
    </html >
  );
}
