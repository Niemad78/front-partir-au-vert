import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ToastProvider } from "@/components/toast";
import "./globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "./custom-theme.css";
import "primeicons/primeicons.css";

const manrope = Manrope({
  weight: ["400"],
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Partir au Vert",
  description:
    "Partir au Vert vous propose des séjours nature en région parisienne. Composez vous même votre séjour ou réservez votre week-end clés en main",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/logo-3.png"
        />
      </head>
      <body className={manrope.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
