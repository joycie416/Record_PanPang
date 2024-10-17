import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers/QueryClientProvider";
import Header from "@/components/features/navbar/Header";
import Footer from "@/components/features/navbar/Footer";
import Background from "@/components/commonUI/Background";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "Record PanPang",
  description: "Share your music at Record PanPang"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pretendard.className} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <Background>{children}</Background>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
