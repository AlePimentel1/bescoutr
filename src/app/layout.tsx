import { Toaster } from "@/components/ui/sonner";
import { brockmann } from "@/lib/fonts";
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
          {children}
        </main>
        <Toaster richColors />
      </body>
    </html >
  );
}
