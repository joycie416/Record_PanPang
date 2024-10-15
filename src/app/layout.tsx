import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import SignOutButton from "@/components/features/auth/signOutButton";
import { supabase, createClient } from "@/utils/supabase/server";
import Providers from "@/components/providers/QueryClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
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
  const supabase = createClient()
  const { data: {user}, error } = await supabase.auth.getUser();
  // console.log('root layout :', user);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="flex justify-between p-4">
          <Link href={"/"}>Home</Link>
          <ul className="flex gap-4">
            {!user ? (
              <>
                <li>
                  <Link href={"/sign-up"}>회원가입</Link>
                </li>
                <li>
                  <Link href={"/sign-in"}>로그인</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={"/mypage"}>마이페이지</Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </>
            )}
          </ul>
        </header>
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
