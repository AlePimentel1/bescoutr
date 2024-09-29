import { Toaster } from "@/components/ui/sonner";
import { brockmann } from "@/lib/fonts";
import TanStackProvider from "@/providers/tanstack-provider";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be Scoutr",
  description: "Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
  openGraph: {
    type: 'website',
    title: 'Be Scoutr',
    description: 'Somos una plataforma que impulsa a los scoutrs a alcanzar sus metas y sueños.',
    url: 'https://scoutr.vercel.app',
    siteName: 'Be Scoutr',
    images: [
      {
        url: 'https://scoutr.vercel.app/imagotipo.webp',
        width: 1200,
        height: 630,
        alt: 'Be Scoutr',
      }
    ]
  }
};


export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang={locale} className={brockmann.className}>
      <body className="relative">
        <main>
          <TanStackProvider>
            {children}
          </TanStackProvider>
        </main>
        <Toaster richColors />
      </body>
    </html >
  );
}
